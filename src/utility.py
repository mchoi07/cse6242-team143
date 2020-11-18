import re
import string
import nltk
from nltk.tokenize import word_tokenize
from textblob import TextBlob, Word
from textblob.sentiments import NaiveBayesAnalyzer
from nltk.corpus import stopwords
import json

nltk.download('stopwords')
nltk.download('punkt')
nltk.download('movie_reviews')


def nlp_preparation (content):
    
    tag_dict = {
        "J": 'a', 
        "N": 'n', 
        "V": 'v', 
        "R": 'r'
    }

    # Only Alphanumeric characters
    content = re.sub(r'[^A-Za-z0-9 ]+', '', content)
    
    # Lowercase
    nlp_1 = content.lower()
    
    # Remove Number
    nlp_2 = re.sub(r'\d+', '', nlp_1)
    
    # Remove puntuation
    nlp_3 = nlp_2.translate(nlp_2.maketrans('', '', string.punctuation))
    
    sentence = TextBlob(nlp_3)
    words_and_tags = [(w, tag_dict.get(pos[0], 'n')) for w, pos in sentence.tags]
    lematized_list = [wd.lemmatize(tag) for wd, tag in words_and_tags if wd not in stopwords.words('english')]
    
    return " ".join(lematized_list)

    # Remove Stopwords & Tokenizing
    '''
    stop_words = set(stopwords.words('english'))
    tokens = word_tokenize(nlp_3)
    token_result = [i for i in tokens if not i in stop_words]
    final_text = " ".join(token_result)
    
    return final_text
    '''


def textblob_sentiment(content, naive = False):

    '''
    If naive = True, it will calculate probability to be positive or negative.
    However, it requires heavy computing..
    If Team wants to enable this, we need to run this on Cloud.
    '''
    
    polarity = TextBlob(content).polarity
    subjectivity = TextBlob(content).subjectivity
    
    if naive == True:
        # Applying the NaiveBayesAnalyzer
        blob_object = TextBlob(content, analyzer=NaiveBayesAnalyzer())
        clf = blob_object.sentiment.classification
        prob_positive = blob_object.sentiment.p_pos
        prob_negative = blob_object.sentiment.p_neg
        
        return polarity, subjectivity, clf, prob_positive, prob_negative
    
    else:
        
        return polarity, subjectivity


def save_to_json(filename, input_dict_list):
    '''
    Save dictionary list to json line by line
    e.g
    [{object1}, {object2}, {object3}]
    to be
    output.json
    [{object1}, {object2}, {object3}]
    
    '''
    output_file = open(filename, 'w', encoding = 'utf-8')
    json.dump(input_dict_list, output_file)
