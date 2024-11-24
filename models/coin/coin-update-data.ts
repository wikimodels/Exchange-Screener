import type { Coin } from './coin';

export interface CoinUpdateData {
  propertiesToUpdate: Partial<Coin>;
  symbol: string;
}
