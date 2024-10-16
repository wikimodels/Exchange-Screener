import { AlertObj } from './alert-obj';

export interface AlertsRepo {
  symbol: string;
  alerts: AlertObj[];
}
