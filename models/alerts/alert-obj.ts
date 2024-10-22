import { Exchange } from 'models/shared/exchange';

export interface AlertObj {
  id: string;
  symbol: string;
  coinExchange?: Exchange;
  coinCategory?: string;
  action: string;
  keyLevelName: string;
  description?: string;
  creationTime?: number;
  activationTime?: number;
  activationTimeStr?: string;
  price: number;
  high: number;
  low: number;
  mainImgUrl?: string;
  imgUrls?: string[];
  logoLink: string;
  isTv?: boolean;
  isActive: boolean;
  tvLink?: string;
  cgLink?: string;
  exchBiLink?: string;
  exchByLink?: string;
}
