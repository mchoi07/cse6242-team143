import re
import string
import nltk
from nltk.tokenize import word_tokenize
from textblob import TextBlob

nltk.download('stopwords')
nltk.download('punkt')

def nlp_preparation (content):
    
    # Only Alphanumeric characters
    content = re.sub(r'[^A-Za-z0-9 ]+', '', content)
    
    # Lowercase
    nlp_1 = content.lower()
    
    # Remove Number
    nlp_2 = re.sub(r'\d+', '', nlp_1)
    
    # Remove puntuation
    nlp_3 = nlp_2.translate(nlp_2.maketrans('', '', string.punctuation))
    
    # Remove Stopwords & Tokenizing
    stop_words = set(stopwords.words('english'))
    tokens = word_tokenize(nlp_3)
    token_result = [i for i in tokens if not i in stop_words]
    final_text = " ".join(token_result)
    
    return final_text