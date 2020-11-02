import urllib.request
import json

APP_KEY = 'API KEY HERE'


def get_data(year=2020, num_of_months=2):
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

    apple_keywords = ['iphone', 'iphones', 'apple', 'ipad', 'macbook', 'airpod']
    tesla_keywards = ['electric battery', 'model3', 'electric car', 'electric vehicle', 'hyperloop', 'tesla']
    netflix_keywards = ['netflix']
    disney_keywords = ['disney']

    for idx in range(1, num_of_months):
        url = "https://api.nytimes.com/svc/archive/v1/{0}/{1}.json?api-key={2}".format(year, str(idx), APP_KEY)

        articles = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))['response']['docs']

        for doc in articles:
            entity = {
               'about_apple': False,
                'about_tesla': False,
                'about_netflix': False,
                'about_disney': False
            }

            if any(word in (doc['headline']['main']).lower() for word in apple_keywords):
                entity['about_apple'] = True

            if any(word in (doc['headline']['main']).lower() for word in tesla_keywards):
                entity['about_tesla'] = True

            if any(word in (doc['headline']['main']).lower() for word in netflix_keywards):
                entity['about_netflix'] = True

            if any(word in (doc['headline']['main']).lower() for word in disney_keywords):
                entity['about_disney'] = True

            if entity['about_apple'] or entity['about_tesla'] or entity['about_netflix'] or entity['about_disney']:

                doc_simple = {
                    'abstract': doc['abstract'],
                    'snippet': doc['snippet'],
                    'main_headline': doc['headline']['main'],
                    'name_headline': doc['headline']['name'],
                    'pub_date': doc['pub_date'],
                    'word_count': doc['word_count'],
                    'news_desk': doc['news_desk'],
                    'section_name': doc['section_name'],
                    'about_apple': entity['about_apple'],
                    'about_tesla': entity['about_tesla']
                }

                result_json.append(doc_simple)

    return result_json


if __name__ == '__main__':

    path = "nytime_data.json"

    result_data = get_data(num_of_months=7)
    with open(path, 'w') as f:
        json.dump(result_data, f)