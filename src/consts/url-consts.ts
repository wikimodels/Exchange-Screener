import { env } from 'environment/environment';
const baseURL = env.baseURL;
export const ALERTS_AT_WORK = 'alerts-at-work';
export const TRIGGERED_ALERTS = 'triggered-alerts';
export const ARCHIVED_ALERTS = 'archived-alerts';
export const coinsUrl = `${baseURL}get-all-coins`;
export const ALERTS_URLS = {
  allAlertsUrl: `${baseURL}get-all-alerts`,
  allArchivedAlertsUrl: `${baseURL}get-all-archived-alerts`,
  allTriggeredAlertsUrl: `${baseURL}
  get-all-triggered-alerts`,
  createAlertUrl: `${baseURL}create-alert`,
  updateAlertUrl: `${baseURL}update-alert`,
  deleteAlertsButchUrl: `${baseURL}delete-alerts-butch`,
  deleteAlertsArchivedButchUrl: `${baseURL}
  delete-archived-alerts-butch`,
  deleteAlertsTriggeredButchUrl: `${baseURL}export const
  delete-triggered-alerts-butch`,
  createArchiveAlertUrl: `${baseURL}create-archived-alert`,
};
