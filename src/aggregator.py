import pandas as pd
import datetime as dt
import json

# Funtion to do aggregtion on company name only
# Aggregation will be done for each date and resulting data_frame
# will have sentiment scrores averaged over the date.
def agg_on_company (df, c_name):
    df_agg = df[['date', 'company', 'sent_score_textblob']]
    df_agg['date'] = df_agg['date'].apply(lambda x: x.strftime("%m-%d-%Y"))
 
    df_agg = df_agg[df_agg['company'] == c_name]
    df_agg = df_agg.groupby(['date', 'company'], as_index=False).agg({'sent_score_textblob': 'mean'})
    return df_agg

def get_company_list(df):
    company_list = list(set(df['company']))
    return company_list

def generate_agg_files(df, c_list, data_source):
    for company in c_list:
        outfile = "{}_{}_avg_bydate.json".format(data_source, company)
        print("Generating ouput file: ", outfile)
        df = agg_on_company(df_nytimes, c_name = company)
        print(df.head())
        df.to_json(outfile,orient='records')
    return

if __name__ == '__main__':

    #Process NY Times data
    nytimes_path = "./data/nytime_data.json"
    df_nytimes = pd.read_json(nytimes_path)
    
    #Get the unique list of companies.
    companies = get_company_list(df_nytimes)

    #Generate agg data files
    generate_agg_files(df_nytimes, companies, 'nytimes')

    #Process twitter data
    twitter_path = "./data/twitter.json"
    df_twitter = pd.read_json(twitter_path)
        
    #Get the unique list of companies.
    companies = get_company_list(df_twitter)

    #Generate agg data files
    generate_agg_files(df_twitter, companies, 'twitter')

    



