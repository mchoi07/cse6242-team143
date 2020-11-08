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
```

**Twitter**

```
snscrape --jsonl twitter-search '<<kewords>> since:yyyy-mm-dd until:yyyy-mm-dd' > <<filename.json>>  
```

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
