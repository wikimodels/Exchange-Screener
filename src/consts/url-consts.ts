import { env } from 'environment/environment';
const baseURL = env.baseURL;
export const ALERTS_AT_WORK = 'alerts-at-work';
export const TRIGGERED_ALERTS = 'triggered-alerts';
export const ARCHIVED_ALERTS = 'archived-alerts';
export const WORK = 'work';

export const coinsUrl = `${baseURL}get-all-coins`;

export const ALERTS_URLS = {
  allAlertsUrl: `${baseURL}get-all-alerts`,
  allArchivedAlertsUrl: `${baseURL}get-all-archived-alerts`,
  allTriggeredAlertsUrl: `${baseURL}get-all-triggered-alerts`,
  createAlertUrl: `${baseURL}create-alert`,
  createArchiveAlertUrl: `${baseURL}create-archived-alert`,
  updateAlertUrl: `${baseURL}update-alert`,
  deleteAlertsButchUrl: `${baseURL}delete-alerts-butch`,
  deleteAlertsArchivedButchUrl: `${baseURL}delete-archived-alerts-butch`,
  deleteAlertsTriggeredButchUrl: `${baseURL}delete-triggered-alerts-butch`,
  addWorkingCoinsUrl: `${baseURL}add-working-coins`,
  deleteAllWorkingCoinsUrl: `${baseURL}delete-all-working-coins`,
  deleteWorkingCoinsButchUrl: `${baseURL}delete-working-coins-butch`,
  getAllWorkingCoinsUrls: `${baseURL}get-all-working-coins`,
};
