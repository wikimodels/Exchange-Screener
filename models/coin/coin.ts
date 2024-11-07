export interface Coin {
  symbol: string;
  turnover24h: number;
  exchange: string;
  category: string;
  logo: string;
  devAct: string;
  devActUrl: string;
  minQty: number;
  minNotional: number;
  tickSize: number;
  tvLink?: string;
  cgLink?: string;
  exchBiLink?: string;
  exchByLink?: string;
}
