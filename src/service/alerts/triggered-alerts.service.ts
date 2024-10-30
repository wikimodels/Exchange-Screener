import { TRIGGERED_ALERTS_URLS } from './../../consts/url-consts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertObj } from 'models/alerts/alert-obj';
import {
  Observable,
  map,
  catchError,
  throwError,
  retry,
  of,
  tap,
  BehaviorSubject,
  switchMap,
} from 'rxjs';
import { SnackbarType } from 'models/shared/snackbar-type';
import { SnackbarService } from '../snackbar.service';

@Injectable({ providedIn: 'root' })
export class TriggeredAlertsService {
  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  //---------------------------------------------
  // ✴️ TRIGGERED ALERTS OBSERVABLE
  //---------------------------------------------
  private alertsTriggeredSubject: BehaviorSubject<AlertObj[]> =
    new BehaviorSubject<AlertObj[]>([]);

  public alertsTriggered$ = this.alertsTriggeredSubject.asObservable(); //

  get AlertsTriggered(): AlertObj[] {
    return this.alertsTriggeredSubject.value;
  }

  //-----------------------------------
  // ✅ GET ALL TRIGGERED ALERTS
  //-----------------------------------
  getAllTriggeredAlerts(): Observable<any> {
    return this.http
      .get<AlertObj[]>(
        TRIGGERED_ALERTS_URLS.triggeredAlertsUrl,
        this.httpOptions
      )
      .pipe(
        tap((data: AlertObj[]) => {
          this.alertsTriggeredSubject.next(data);
        }),
        catchError((err) => of(err.error.text))
      );
  }

  //-----------------------------------
  // ✅ DELETE TRIGGERED ALERTS BATCH
  //-----------------------------------
  deleteTriggeredAlertsButch(alerts: AlertObj[]) {
    const ids = alerts.map((a) => a.id);

    return this.http
      .delete<AlertObj>(TRIGGERED_ALERTS_URLS.triggeredAlertsDeleteBatchUrl, {
        body: ids,
        ...this.httpOptions,
      })
      .pipe(
        switchMap((data: any) => {
          const msg = `Deleted ${data.deleted} items`;
          this.snackbarService.showSnackBar(msg, '', 3000, SnackbarType.Info);

          return this.http.get<AlertObj[]>(
            TRIGGERED_ALERTS_URLS.triggeredAlertsUrl,
            this.httpOptions
          );
        }),
        tap((updatedAlerts: AlertObj[]) => {
          this.alertsTriggeredSubject.next(updatedAlerts);
        }),
        catchError(this.handleError)
      );
  }

  //---------------------------------------------
  // ✅ UPDATE ALERT VIA TRIGGERED ALERTS
  //---------------------------------------------
  updateAlertViaTriggered(data: AlertObj) {
    return this.http
      .put<AlertObj>(
        TRIGGERED_ALERTS_URLS.triggeredAlertUpdateAlertUrl,
        data,
        this.httpOptions
      )
      .pipe(
        switchMap((data: any) => {
          const msg = `Alert Update ${data.ok}`;
          this.snackbarService.showSnackBar(msg, '', 3000, SnackbarType.Info);
          return this.http.get<AlertObj[]>(
            TRIGGERED_ALERTS_URLS.triggeredAlertsUrl,
            this.httpOptions
          );
        }),
        tap((updatedAlerts: AlertObj[]) => {
          this.alertsTriggeredSubject.next(updatedAlerts);
        }),
        catchError(this.handleError)
      );
  }

  //---------------------------------------------
  // ✅ ERROR HANDLING
  //---------------------------------------------
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log to console or send to a logging service
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
