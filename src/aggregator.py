import pandas as pd
import datetime as dt
import json

# Funtion to do aggregtion on company name only
# Aggregation will be done for each date and resulting data_frame
# will have sentiment scrores averaged over the date.
def agg_on_company (df):
    df_out = df[['date', 'company', 'source', 'sent_score_textblob', 'sent_score_custom']]
    df_out['date'] = df_out['date'].apply(lambda x: x.strftime("%m-%d-%Y"))
    df_out['positives_textblob'] = [1 if x >= 0.2 else 0 for x in df_out['sent_score_textblob']]
    df_out['negatives_textblob'] = [1 if x <= -0.2 else 0 for x in df_out['sent_score_textblob']]
    df_out['positives_custom'] = [1 if x >= 0.2 else 0 for x in df_out['sent_score_custom']]
    df_out['negatives_custom'] = [1 if x <= -0.2 else 0 for x in df_out['sent_score_custom']]
    df_out = df_out.groupby(['date', 'company', 'source'],
                            as_index=False).agg({'sent_score_textblob': 'mean',
                                                'sent_score_custom':'mean',
                                                'positives_textblob':'sum',
                                                'negatives_textblob':'sum',
                                                'positives_custom':'sum',
                                                'negatives_custom':'sum'})
    return df_out

def append_finance_data(df, df_fin):
    df_out = pd.merge(df, df_fin, on=['date','company'], how='left')
    df_out['price_change'].fillna(0, inplace=True)
    return df_out

def get_company_list(df):
    company_list = list(set(df['company']))
    return company_list

def generate_agg_file(df, df_fin):
    outfile = "aggregated.json"
    print("Generating ouput file: ", outfile)
    df_temp = agg_on_company(df)
    df_out = append_finance_data(df_temp, df_fin)
    df_out.to_json(outfile,orient='records')
    return

def get_finance_data(path, ticker_map):
    df = pd.read_json(path)
    df['date'] = df['date'].apply(lambda x: x.strftime("%m-%d-%Y"))
    df["ticker"] = df['ticker'].apply(lambda x: ticker_map[x])
    df = df[['date','ticker','close', 'close diff']].rename(columns={'date':'date',
                                                                     'ticker':'company',
                                                                     'close':'price',
                                                                     'close diff': 'price_change'})
    return df

if __name__ == '__main__':
    #Process NY Times data
    #nytimes_path = "./data/nytime_data.json"
    #df_nytimes = pd.read_json(nytimes_path)
    
    #Get the unique list of companies.
    #companies = get_company_list(df_nytimes)

    #Generate agg data files
    #generate_agg_files(df_nytimes, companies, 'nytimes')

    #Get Finance Data.
    symbol_company_mapping = {'AAPL':'APPLE', 'DIS':'DISNEY', 'NFLX':'NETFLIX', 'TSLA':'TESLA'}
    finance_path = "./data/fnce_data.json"
    df_finance = get_finance_data(finance_path, symbol_company_mapping)

    #Process twitter data
    twitter_path = "./data/twitter.json"
    df_twitter = pd.read_json(twitter_path)

    #Temp code-- remove once NYTIMES data is available with custom sentiment score.
    df_nytimes = df_twitter.copy()
    df_nytimes['source'] = "NYTIMES"
        
    #Get the unique list of companies.
    companies = get_company_list(pd.concat([df_twitter, df_nytimes]))

    #Generate agg data files
    generate_agg_file(pd.concat([df_twitter, df_nytimes]), df_finance)