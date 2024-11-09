import { Exchange } from '../shared/exchange.js';

export interface Alert {
  id: string;
  action: string;
  alertName: string;
  description?: string;
  creationTime?: number;
  activationTime?: number;
  activationTimeStr?: string;
  price: number;
  high: number;
  low: number;
  tvImgUrls?: string[];
  isActive: boolean;
  isTv?: boolean;
  symbol: string;
  exchange: string;
  category?: string;
  status: string;
  tvLink?: string;
  cgLink?: string;
  bybitExch?: string;
  binanceExch?: string;
  image_url?: string;
  coinExchange?: string;
}
