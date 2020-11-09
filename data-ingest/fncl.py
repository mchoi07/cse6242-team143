import pandas as pd
import datetime as dt
import json
from yahoo_fin.stock_info import *

# Company list  
#companies = ["APPLE", "TESLA", "NETFLIX", "DISNEY"]
tickers = ["AAPL", "TSLA", "NFLX", "DIS"]

#timeperiod
sd=dt.datetime(2019, 1, 1)
ed=dt.datetime(2020, 11, 8)

data =pd.DataFrame()

for i in tickers:
    tmp = pd.DataFrame()
    tmp = get_data(i, start_date=sd, end_date=ed,interval="1d") #index_as_date=False
    data = data.append(pd.concat([tmp,tmp[['close','volume']].diff(axis=0,periods=1).rename({'close':'close diff','volume':'volume diff'},axis=1)],axis=1))
data = data.reset_index().rename({'index':"date"},axis=1)
#data.iloc[465:472,]   #confirm that diff is done for each company
#print(data)
#note that diff has n/a for each of the first date chosen. 


tojson = data.to_json(orient="records",date_format="iso")
parsed = json.loads(tojson)
with open('fnce_data.json','w') as outfile:
    json.dump(parsed, outfile)
