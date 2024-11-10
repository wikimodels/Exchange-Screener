import { env } from 'environment/environment';
//COMPONENTS
export const TRIGGERED_ALERTS = 'triggered-alerts';
export const ARCHIVED_ALERTS = 'archived-alerts';
export const COIN_BLACK_LIST = 'coin-black-list';
export const ALERTS_AT_WORK = 'alerts-at-work';
export const COIN_PROVIDER = 'coin-provider';
export const COIN_SORTER = 'coin-sorter';
export const SANTIMENT = 'santiment';
export const WORK = 'work';
export const COIN = 'coin';

//URLS
const baseURL = env.baseURL;
export const coinsUrl = `${baseURL}get-all-coins`;

export const SANTIMENT_URLS = {
  alertsUrl: `${baseURL}/santiment/echarts`,
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
  coinsDeleteManyUrl: `${baseURL}/coins/delete/many`,
  coinsUpdateOneUrl: `${baseURL}/coins/update/one`,
  coinsMoveManyUrl: `${baseURL}/coins/move/many`,
  coinsRunRefreshmentUrl: `${baseURL}/coins/refreshment-procedure/run`,
};

export const BINACE_WS_URLS = {
  binanceWsStartUrl: `${baseURL}/ws/binance/start`,
  binanceWsCloseUrl: `${baseURL}/ws/binance/close`,
  binanceWsStatusUrl: `${baseURL}/ws/binance/status`,
};

export const BYBIT_WS_URLS = {
  bybitWsStartUrl: `${baseURL}/ws/bybit/start`,
  bybitWsCloseUrl: `${baseURL}/ws/bybit/close`,
  bybitWsStatusUrl: `${baseURL}/ws/bybit/status`,
};
