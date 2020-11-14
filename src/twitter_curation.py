import json
import os
from utility import nlp_preparation, textblob_sentiment, save_to_json

def define_object(dictionary, company, filename, naive = False):
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
            data_dict['textblob_sentiment_polarity'], data_dict['textblob_sentiment_subjectivity'] = textblob_sentiment(data_dict['content_clean'])
        

    return data_dict

if __name__ == '__main__':
    dir_path = '/Users/MinkyuChoi/Googledrive/3.education/edu_academic/georgia_tech/2020_3.class_fall/CSE6242/Group Project (CSE6242)/Engineering /Data/twitter-jan'
    data_list = []

        
    for file in os.listdir(dir_path):
        company = file.split('_')[0]
        
        if 'json' in file:
            json_path = os.path.join(dir_path, file)
            # print(json_path)
            
            with open(json_path, 'r') as f:
                for jsonObj in f:
                    temp_object = json.loads(jsonObj)
                    json_object = define_object(temp_object,company,file)
                    if json_object != {}:
                        data_list.append(json_object)

    # Save to json
    save_to_json('twitter.json', data_list)