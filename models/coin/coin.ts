import { Status } from './status';

export interface Coin {
  santimentTicker?: string;
  slug?: string;
  santimentName?: string;
  symbol: string;
  turnover24h: number;
  exchanges: string[];
  strategies: string[];
  category: string;
  status: Status;
  coinGeckoId?: string;
  devActUrl?: string;
  minQty?: number;
  minNotional?: number;
  tickSize?: number;
  imageUrl?: string;
  market_cap_rank?: number;
  market_cap_fdv_ratio?: number;
  facebook_likes?: number;
  twitter_followers?: number;
  reddit_subscribers?: number;
  telegram_channel_user_count?: number;
  gh_forks?: number;
  gh_stars?: number;
  gh_subscribers?: number;
  gh_total_issues?: number;
  gh_closed_issues?: number;
  gh_pull_requests_merged?: number;
  gh_pull_request_contributors?: number;
  gh_additions?: number;
  gh_deletions?: number;
  gh_commit_count_4_weeks?: number;
  image_url?: string;
  coinGeckoAvailable?: boolean;
  santimentAvailable?: boolean;
  description?: string;
  collection?: string;
  isAtWork?: boolean;
  isSelectedForWork?: boolean;
}
