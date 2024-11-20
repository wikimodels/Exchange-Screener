export type CoinStatistics = {
  total: number;
  [category: string]: number | ExchangeStatistics;
};

export type ExchangeStatistics = {
  total: number;
  bi?: number;
  by?: number;
  biby?: number;
};
