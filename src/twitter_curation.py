import json
import os
import re
import string
import nltk
from nltk.tokenize import word_tokenize
nltk.download('stopwords')

def nlp_preparation_basis (content):
    
    # Only Alphanumeric characters
    content = re.sub(r'[^A-Za-z0-9 ]+', '', content)
    # Lowercase
    nlp_1 = content.lower()
    
    # Remove Number
    nlp_2 = re.sub(r'\d+', '', nlp_1)
    
    # Remove puntuation
    nlp_3 = nlp_2.translate(nlp_2.maketrans('', '', string.punctuation))
    
    return nlp_3

def define_object(dictionary,company):
    # Return Varialbe: Dictionary 
    data_dict = {}
    
    # Sort by language (Only English)
    if dictionary['lang'] == 'en':
        
        data_dict['date'] = dictionary['date'].split('T')[0]
        data_dict['company'] = company
        data_dict['content'] = nlp_preparation_basis(dictionary['content'])
        

    return data_dict

if __name__ == '__main__':
    dir_path = ''
    data_list = []
        
    for file in os.listdir(dir_path):
        company = file.split('_')[0]
        
        if 'json' in file:
            file_list.append(file)
            json_path = os.path.join(path, file)
            # print(json_path)
            
            with open(json_path, 'r') as f:
                for jsonObj in f:
                    temp_object = json.loads(jsonObj)
                    json_object = define_object(temp_object,company)
                    if json_object != {}:
                        data_list.append(json_object)