import { env } from 'environment/environment';
//COMPONENTS
export const TRIGGERED_ALERTS = 'triggered-alerts';
export const ARCHIVED_ALERTS = 'archived-alerts';
export const COIN_BLACK_LIST = 'coin-black-list';
export const ALERTS_AT_WORK = 'alerts-at-work';
export const COIN_PROVIDER = 'coin-provider';
export const COIN_SORTER = 'coin-sorter';
export const SANTIMENT_CHARTS = 'santiment-charts';
export const ADMIN = 'admin';
export const WORK = 'work';
export const COIN_REPO = 'coin-repo';
export const WS = 'ws';

//URLS
const baseURL = env.baseURL;
export const coinsUrl = `${baseURL}get-all-coins`;

export const SANTIMENT_URLS = {
  echartsUrl: `${baseURL}/santiment/echarts`,
  dataMissingUrl: `${baseURL}/santiment/coins/data-missing`,
};

export const ALERTS_URLS = {
  alertsUrl: `${baseURL}/alerts`,
  alertsAddOneUrl: `${baseURL}/alerts/add/one`,
  alertsDeleteManyUrl: `${baseURL}/alerts/delete/many`,
  alertsUpdateOneUrl: `${baseURL}/alerts/update/one`,
  alertsMoveManyUrl: `${baseURL}/alerts/move/many`,
};

export const COINS_URLS = {
  coinsUrl: `${baseURL}/coins`,
  coinsAddOneUrl: `${baseURL}/coins/add/one`,
  coinsAddManyUrl: `${baseURL}/coins/add/many`,
  coinsMoveManyUrl: `${baseURL}/coins/move/many`,
  coinsUpdateOneUrl: `${baseURL}/coins/update/one`,
  coinsDeleteManyUrl: `${baseURL}/coins/delete/many`,
  coinsUpdateManyUrl: `${baseURL}/coins/update/many`,
  coinsRepoStatisticsUrl: `${baseURL}/coins/repo/statistics`,
  coinsByCollectionNameUrl: `${baseURL}/coins/collection-name`,
  coinsRunRefreshmentUrl: `${baseURL}/coins/refreshment-procedure/run`,
};

export const BINACE_WS_URLS = {
  binanceWsStartUrl: `${baseURL}/ws/binance/start`,
  binanceWsPauseUrl: `${baseURL}/ws/binance/pause`,
  binanceWsStatusUrl: `${baseURL}/ws/binance/status`,
};

export const BYBIT_WS_URLS = {
  bybitWsStartUrl: `${baseURL}/ws/bybit/start`,
  bybitWsPauseUrl: `${baseURL}/ws/bybit/pause`,
  bybitWsStatusUrl: `${baseURL}/ws/bybit/status`,
};
