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
  AggregatedSentimentAnalysis: AggregatedSentimentAnalysis[];
}
interface AggregatedSentimentAnalysis {
  Method: string;
  CountOfPositives: number;
  CountOfNeutrals: number;
  CountOfNegatives: number;
  averageSentimentScore: number;
}