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

