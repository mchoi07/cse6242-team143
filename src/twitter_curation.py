import json
import os
import time
from utility import nlp_preparation, textblob_sentiment, save_to_json
from sentiment_classifier import SentimentClassifier, NLPModule

def define_object(dictionary, company, filename,  classifier = None, naive = False):
    # Return Varialbe: Dictionary 
    data_dict = {}
    
    # Sort by language (Only English)
    if dictionary['lang'] == 'en':
        
        data_dict['date'] = dictionary['date'].split('T')[0]
        data_dict['company'] = company
        data_dict['keyword'] = filename.split('_')[2].split('.')[0]
        data_dict['content_raw'] = dictionary['content']
        data_dict['content_clean'] = nlp_preparation(dictionary['content'])
        data_dict['source'] = 'TWITTER'
        
        if naive == True:
            data_dict['textblob_sentiment_polarity'], data_dict['textblob_sentiment_subjectivity'], data_dict['textblob_sentiment_classification'], data_dict['textblob_sentiment_p_pos'], data_dict['textblob_sentment_p_neg'] = textblob_sentiment(data_dict['textblob_content_clean'])
        
        else:
            data_dict['sent_score_textblob'], _ = textblob_sentiment(data_dict['content_clean'])
        
        data_dict['sent_score_custom'] = classifier.classify_sentiment(text = data_dict['content_clean'])

    return data_dict

if __name__ == '__main__':
    start_time = time.time()
    interval_time = time.time()
    dir_path = './twitter-raw'
    data_list = []
    nlp_mod = NLPModule(whitelist_path = "whitelist_words.txt")
    sentiment_classifier = SentimentClassifier(nlp_mod, "trained_sentiment_classifier")
    sentiment_classifier.train_model()
    prev_company = ""

    for file in os.listdir(dir_path):
        company = file.split('_')[0]
        
        if 'json' in file:
            json_path = os.path.join(dir_path, file)
            if(company != prev_company):   
                if (prev_company != ""):
                    print("Time taken %s seconds ---" % (time.time() - interval_time))
                    interval_time = time.time()
                print("Processing data for {} ....".format(company))
                prev_company = company

            with open(json_path, 'r') as f:
                for jsonObj in f:
                    temp_object = json.loads(jsonObj)
                    json_object = define_object(temp_object,company,file, classifier = sentiment_classifier)
                    if json_object != {}:
                        data_list.append(json_object)

    # Save to json
    save_to_json('twitter.json', data_list)
    print("Total Time taken %s seconds ---" % (time.time() - start_time))