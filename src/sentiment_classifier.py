import nltk
nltk.download('twitter_samples')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')
import re, string
import random
import os.path
from os import path
from nltk import FreqDist
from nltk import NaiveBayesClassifier
from nltk import classify
from nltk import ngrams
from nltk.tokenize import TweetTokenizer
from nltk.corpus import twitter_samples
from nltk.tag import pos_tag
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import stopwords
import pickle
stop_words = stopwords.words('english')


class NLPModule:
    def __init__(self, whitelist_path = None, ngrams = None):
        self.tbd = None
        self.train_data = None
        self.test_data = None
        self.normalizer = WordNetLemmatizer()
        self.whitelist = []
        self.ngrams = ngrams
        if whitelist_path != None and path.exists(whitelist_path):
            print ("whitelist file found! Creating whitelist")
            with open(whitelist_path, "r") as file:
                for line in file:
                    for word in line.split():
                        self.whitelist.append(word)
            print ("Whitelist is: ", self.whitelist)
            
                

    #Function to tokenize the Text
    #Input <- text: type string, A text sentence to be tokenized
    #output <- tokens: type list, A list of tokens
    def tokenize (self, text):
        tokenizer = TweetTokenizer()
        tokens = tokenizer.tokenize(text)
        return tokens

    # Funtion normalizes the token for processing. e.g. words 'Hii', 'hi', 'Hi' will be normalized to 'hi'
    # Inputs <- token: type string, word string to be normalized
    #           tag: type string, pos tag added to identify nouns, verbs etc.
    # Ouput -> Normalized_token: type string, Normalized word
    def normalize_data_token(self, token, tag):

        #Highlight nouns and verbs and set other token tags to 'a'
        if tag.startswith("NN"):
            p_tag = 'n'
        elif tag.startswith('VB'):
            p_tag = 'v'
        else:
            p_tag = 'a'

        #Normalize and convert it to lower case
        normalized_token =  self.normalizer.lemmatize(token, p_tag).lower()
        return normalized_token

    # Funtion checks if token is valid
    # Input <- token: type string, token to be validated
    # Ouput -> valid: type Boolean, True or False
    def token_valid(self, token):
        valid = True

        #Token must be of lenth greater than 0
        if len(token) <= 0:
            valid = False

        #Remove string punctuations
        elif token in string.punctuation:
            valid = False

        #Remove standard NLP stop words but keep whitlisted stop words.
        elif token in stop_words and token not in self.whitelist:
            valid = False

        return valid

    # This function cleans a list of word tokens. Keeps only valid tokens and discards the rest
    # Inputs <- tokens : type list, The list of token strings to be cleaned
    # Outputs -> cleaned_tokens : type list, The list of cleaned tokens
    def clean_tokens (self, tokens):
        cleaned_tokens = []
        for token, p_tag in pos_tag(tokens):
            #Remove the URLs
            token = re.sub(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+#]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+',"", token)

            #Remove words preceding with @ sign
            token = re.sub("(@[a-zA-Z0-9_]+)","", token)

            #Normalize the token
            token = self.normalize_data_token(token, p_tag)

            if (self.token_valid(token)):
                cleaned_tokens.append(token)

        return cleaned_tokens

    # This function cleans a list of tokenized sentences, invokes clean_tokes
    # for each sentence.
    # Inputs <- noisy_data_tokens : type list of lists, Multiple lists of tokens
    # Outputs -> cleaned_tokens : type list or lists, Multiple lists cleaned
    def clean_tokenized_sentences (self, noisy_data_tokens):
        clean_token_list = []
        for tokens in noisy_data_tokens:
            clean_tokens = self.clean_tokens(tokens)
            if (len(clean_tokens) > 0):
                clean_token_list.append(clean_tokens)
        return clean_token_list


    # This function creates a vecotrized list of tokens. It determines the frequency of
    # each cleaned token and then creates a dictionary of each token and count.
    # Finally insert this vectorized tokens (dictionary of token and frequency) to the list
    # Inputs <- token_list : type list of lists, List of token lists to be vectorized
    # Outputs -> vectorized_list: type list of dictionaries
    def vectorize_tokens (self, token_list):
        vectorized_tokens = []
        for tokens in token_list:
            if (self.ngrams != None):
                tokens = ngrams(tokens, self.ngrams)
            #Get the frequncy of each token
            vector_tokens = FreqDist(tokens)
            #Create a dictionary
            dic_tokens = dict(vector_tokens)
            vectorized_tokens.append(dic_tokens)
        return vectorized_tokens

    # Function to load the raw data for training the model. Right now this function
    # just loades the twitter samples provided by the NLTK library
    # Inputs <- None
    # Ouput -> Positive_data_tokenized: type list of strings,
    #          negative_data_tokenized: type list of strings
    def load_raw_training_data(self):
        #Load the in built NLTK training data. Used other data sets if necessary
        #to improve accuracy.
        positive_data_tokenized = twitter_samples.tokenized('positive_tweets.json')
        negative_data_tokenized = twitter_samples.tokenized('negative_tweets.json')

        return positive_data_tokenized, negative_data_tokenized

    # Function to get the pre-labeled training data and sampled test data after,
    # cleaning, vectorization and etc.
    # Inputs <- training ratio: type float <= 1.0, Ratio of training data from all data
    # Ouput -> train_data: data to train the model
    #          test_data: sampled test data to check model accuracy
    def get_training_data (self, training_ratio = 0.8):
        #Get the poitive and negative data in raw tokenized form
        positive_data, negative_data = self.load_raw_training_data()

        #Clean all tokens
        positive_data_cleaned = self.clean_tokenized_sentences(positive_data)
        negative_data_cleaned = self.clean_tokenized_sentences(negative_data)

        #Vectorize the tokens
        positive_data_vectorized = self.vectorize_tokens(positive_data_cleaned)
        negative_data_vectorized = self.vectorize_tokens(negative_data_cleaned)

        #Label positive data as 1.0 and negative as -1.0
        positive_data = [(data_point, 1.0) for data_point in positive_data_vectorized]
        negative_data = [(data_point, -1.0) for data_point in negative_data_vectorized]

        #combine the data and shuffle it later
        all_data = positive_data + negative_data

        #Shuffle all data and then do a random sample.
        random.shuffle(all_data)

        #Sample the training and test data depending on the training ratio
        train_data_len = int(len(all_data) * training_ratio)
        self.train_data = all_data[:train_data_len]
        self.test_data = all_data[train_data_len:]

        return self.train_data, self.test_data

class SentimentClassifier:
    def __init__(self, nlp_module, trained_classifier_path=None):
        self.nlp = nlp_module
        self.classifier_path = trained_classifier_path
        self.classifier = None
        if self.classifier_path != None and path.exists(self.classifier_path):
            self.load_model(self.classifier_path)

    #Function to calculate average sentiment from a list sentence strings
    #For each sentence the calculated sentiment will be +1.0 or -1.0
    #Average sentiment score will be the mean of positives and negative sentiments
    def average_sentiment (self, test_dataset):
        sentiment = self.classifier.classify_many(test_dataset)
        num_data_points = len(sentiment)
        avg_sentiment = round(sum(sentiment)/num_data_points, 2)
        return avg_sentiment

    #This function trains the model
    def train_model(self):
        if self.classifier == None:
            print ("Trained Classifier not present. Training Model please wait...")
            train_dataset, test_dataset = self.nlp.get_training_data()
            self.classifier = NaiveBayesClassifier.train(train_dataset)
            print("Model Trained!!")
            print("Accuracy on sampled test data:", classify.accuracy(self.classifier, test_dataset))
            #Train the model again with all data
            self.classifier = NaiveBayesClassifier.train(train_dataset + test_dataset)
            if self.classifier_path != None:
                self.save_model(self.classifier_path)
            #print(self.classifier.show_most_informative_features(10))
        else:
            print ("Trained Classifier found. Skip training !!")
        return

    #Function to save the Model
    #Inputs <- path: type string, Full path including file name to save the model
    #output -> None Model should be saved in the above file
    def save_model (self, path):
        print ("Saving trained classifier at: ", path)
        pickle.dump(self.classifier, open(path, 'wb'))
        return

    #Load a pre-trained model
    #Inputs <- path: type string, Full path including file name to save the model
    #output -> None Model should be save
    def load_model(self, path):
        print ("Loading trained classifier from: ", path)
        self.classifier = pickle.load(open(path, 'rb'))
        return

    # Returns the sentiment of the text as a float.
    # Input: Text for sentiment classification.
    # Output: Sentiment float (Negative = -1.0, Positive = 1.0)
    def classify_sentiment_discrete(self, text):
        #Tokenize and clean the Input text first
        tokens = self.nlp.tokenize(text)
        tokens = self.nlp.clean_tokens(tokens)

        #In this case it is just one data set
        dataset = self.nlp.vectorize_tokens([tokens])
        return (self.average_sentiment(dataset))

    def classify_probability (self, text):
        #Tokenize and clean the Input text first
        tokens = self.nlp.tokenize(text)
        tokens = self.nlp.clean_tokens(tokens)

        #In this case it is just one data set
        dataset = self.nlp.vectorize_tokens([tokens])[0]
        
        return (self.classifier.prob_classify(dataset))

    def classify_sentiment (self, text):
        probability_sentiment = self.classify_probability(text)
        p_positive = probability_sentiment.prob(1)
        p_negative = probability_sentiment.prob(-1)

        if(p_positive > p_negative):
            sent_score = (p_positive - 0.5)*2
        else:
            sent_score = -(p_negative - 0.5)*2
        return (sent_score)

if __name__ == '__main__':
    #N_GRAMS = 2
    #nlp_mod = NLPModule(whitelist_path = "whitelist_words.txt", ngrams = N_GRAMS)
    nlp_mod = NLPModule(whitelist_path = "whitelist_words.txt")
    sentiment_classifier = SentimentClassifier(nlp_mod, "trained_sentiment_classifier")
    sentiment_classifier.train_model()

    #Test code
    #text = "This is a great restaurant!! The service is amazing, and the food is really good too!"
    #text="I had such a bad day today. I fell alseep during class and math class was so boring."
    text = "I love my kids. There is nothing in my life that matters more"
    print("Classifying sentiment for:", text)
    sentiment = sentiment_classifier.classify_sentiment(text)
    if (sentiment > 0):
        print("Sentiment is: Positive")
    else:
        print("Sentiment is: Negative")

    probability_distrubition = sentiment_classifier.classify_probability(text)
    print("Probability of classification: positive: {} negative: {}".format(
           round (probability_distrubition.prob(1), 2),
           round (probability_distrubition.prob(-1), 2)))