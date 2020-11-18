import urllib.request
import json
from nltk.corpus import stopwords
from textblob import TextBlob, Word
from utility import nlp_preparation, textblob_sentiment

APP_KEY = 'KEY HERE'

def get_data(year=2019, num_of_months=2):
    '''
        PARAMS:
            year: INT
            format: YYYY
            Defaults to 2020 if not specified

            num_of_months: INT
            Number of months to get. If not specified, will get data for only first month of the year

        Returns:
            List of dicts where each dict contains info about an article
    '''
    result_json = []

    apple_keywords = ['iphone', 'iphones', 'apple', 'ipad', 'macbook', 'airpod', 'ios', 'macos', 'tim cook']
    tesla_keywards = ['electric battery', 'model3', 'electric car', 'electric vehicle', 'hyperloop', 'tesla', 'self driving', 'autonomous vehicle', 'spacex', 'elon musk', 'solarcity']
    netflix_keywards = ['netflix', 'nflx', 'reed hastings']
    disney_keywords = ['disney', 'bob chapek']

    for idx in range(1, num_of_months):
        url = "https://api.nytimes.com/svc/archive/v1/{0}/{1}.json?api-key={2}".format(year, str(idx), APP_KEY)

        articles = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))['response']['docs']

        for doc in articles:
            entity = {
               'company': None,
               'keywords': None
            }

            if any(word in (doc['headline']['main']).lower() for word in apple_keywords):
                entity['company'] = 'APPLE'
                entity['keywords'] = apple_keywords

            if any(word in (doc['headline']['main']).lower() for word in tesla_keywards):
                entity['company'] =  'TESLA'
                entity['keywords'] = tesla_keywards

            if any(word in (doc['headline']['main']).lower() for word in netflix_keywards):
                entity['company'] = 'NETFLIX'
                entity['keywords'] = netflix_keywards

            if any(word in (doc['headline']['main']).lower() for word in disney_keywords):
                entity['company'] = 'DISNEY'
                entity['keywords'] = disney_keywords

            if entity['company']:
                text = doc['abstract'] + ' ' + doc['headline']['main']
                doc_simple = {
                    'date': doc['pub_date'],
                    'company': entity['company'],
                    'keyword': entity['keywords'],
                    'content_raw': text,
                    'content_clean': nlp_preparation(text),
                    'source': 'NYT',
                    'sent_score_textblob': textblob_sentiment(nlp_preparation(text))[0]
                }

                result_json.append(doc_simple)

    return result_json


if __name__ == '__main__':

    path = "nytime_data.json"

    result_data = get_data(num_of_months=2)
    with open(path, 'w') as f:
        json.dump(result_data, f)
