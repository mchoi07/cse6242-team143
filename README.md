# cse6242-team143

Requirement

1. Python > 3.8.x

**Environment**

```
conda create --name py38 python=3.8

// activate
conda activate py38

// environment prep
pip install:
- tweepy
- git+https://github.com/JustAnotherArchivist/snscrape.git
- NLTK
```

**Twitter Data Ingest**

```
snscrape --jsonl twitter-search '<<kewords>> since:yyyy-mm-dd until:yyyy-mm-dd' > <<filename.json>>  
**Data Curation**
```

1. Twitter

   * Selected Relevant Feaures form very nosiy data

     * Date
     * Company
     * Content

   * Conducted Basis NLP Preparation

     ```python
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
     ```

     



**References**

> https://medium.com/@datamonsters/text-preprocessing-in-python-steps-tools-and-examples-bf025f872908
>
> 
=======
**NYT**

Execution: python nyt.py

***Output:***
Returns a json list of articles where each article in the list is a json object of structure:

 ```
 {
    'abstract': string,
    'abstract_clean': string,  # This is the abstract lemmatized and english stop words removed.
    'snippet': string,
    'main_headline': string,
    'name_headline': string,
    'pub_date': date,
    'word_count': integer,
    'news_desk': string,
    'section_name': string,
    'about_apple': string,
    'about_tesla': string
}
 ```

**Yahoo Finance**

Execution: python fncl.py

***Output:***
Returns a json list of closing price, volume and their changes per each company tickers per day. 

 ```
 {
    'ticker': string,
    'date': date, 
    'close': float64,
    'close diff': float64,
    'volume': float64,
    'volume diff': float64,
}
 ```
>>>>>>> 2690c5623a5ae975e5982308a477218f284b8a1e
