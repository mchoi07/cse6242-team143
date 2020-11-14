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
```

**Data Curation**

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