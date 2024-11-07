import { env } from 'environment/environment';
//COMPONENTS
export const TRIGGERED_ALERTS = 'triggered-alerts';
export const ARCHIVED_ALERTS = 'archived-alerts';
export const COIN_BLACK_LIST = 'coin-black-list';
export const ALERTS_AT_WORK = 'alerts-at-work';
export const COIN_PROVIDER = 'coin-provider';
export const WORK = 'work';
export const COIN = 'coin';

//URLS
const baseURL = env.baseURL;
export const coinsUrl = `${baseURL}get-all-coins`;

export const ALERTS_URLS = {
  alertsUrl: `${baseURL}/alerts`,
  alertsCreateBatchUrl: `${baseURL}/alerts/create/batch`,
  alertsCreateOneUrl: `${baseURL}/alerts/create/one`,
  alertsUpdateUrl: `${baseURL}/alerts/update`,
  alertsBatchDelete: `${baseURL}/alerts/batch-delete`,
  archiveAlert: `${baseURL}/alerts/archive`,
  alertsDeleteAllUrl: `${baseURL}/alerts/delete/all`,
  alertsDeleteBatchUrl: `${baseURL}/alerts/delete/batch`,
};

export const ARCHIVED_ALERTS_URLS = {
  archivedAlertsUrl: `${baseURL}/archive/alerts`,
  archivedAlertsDeleteBatchUrl: `${baseURL}/archive/delete/batch`,
  archivedAlertsDeleteAllUrl: `${baseURL}/archive/delete/all`,
  archivedAlertsUpdateOneUrl: `${baseURL}/archive/update/one`,
};

export const TRIGGERED_ALERTS_URLS = {
  triggeredAlertsUrl: `${baseURL}/triggered/alerts`,
  triggeredAlertsDeleteBatchUrl: `${baseURL}/triggered/delete/batch`,
  triggeredAlertUpdateAlertUrl: `${baseURL}/triggered/update/alert`,
};

export const COINS_URLS = {
  coinsUrl: `${baseURL}/coins`,
  coinsAddOneUrl: `${baseURL}/coins/add/one`,
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
