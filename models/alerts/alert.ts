import { Exchange } from '../shared/exchange.js';

export interface Alert {
  id: string;
  action: string;
  alertName: string;
  description?: string;
  creationTime?: number;
  activationTime?: number;
  activationTimeStr?: string;
  startPrice?: number;
  startBar?: number;
  endPrice?: number;
  endBar?: number;
  price?: number;
  high: number;
  low: number;
  tvImgUrls?: string[];
  isActive: boolean;
  isTv?: boolean;
  symbol: string;
  category?: string;
  status: string;
  tvLink?: string;
  cgLink?: string;
  exchanges?: string[];
  image_url?: string;
  coinExchange?: string;
  isInclined: boolean;
}
