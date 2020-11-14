interface StockPriceAndSentiment {
  StockSymbol: string;
  StockDailyPrice: DailyPrice[];
  DailySentiments: {
    Twitter: DailySentiment[],
    NYT: DailySentiment[]
  }
}

interface DailyPrice {
  Date: Date;
  ClosingPrice: number;
  ChangeRatio: number;
}

interface DailySentiment {
  Date: Date;
  KeywordSentiment: KeywordSentiment[];
}

interface KeywordSentiment {
  Keyword: string;
  CountOfInputs: number;
  AggregatedSentimentAnalysis: AggregatedSentimentAnalysis[];
}

interface AggregatedSentimentAnalysis {
  Method: string;
  ProbOfPositives: number;
  ProbOfNegatives: number;
  ProbOfNeutrals: number;
  averageSentimentScore: number;
}