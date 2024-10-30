import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ALERTS_URLS } from 'src/consts/url-consts';
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
import { SnackbarService } from '../snackbar.service';
import { SnackbarType } from 'models/shared/snackbar-type';

@Injectable({ providedIn: 'root' })
export class AlertsService {
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
  // ✴️ ALERTS AT WORK OBSERVABLE
  //---------------------------------------------
  private alertsSubject: BehaviorSubject<AlertObj[]> = new BehaviorSubject<
    AlertObj[]
  >([]);

  public alerts$ = this.alertsSubject.asObservable();

  get Alerts(): AlertObj[] {
    return this.alertsSubject.value;
  }

  //---------------------------------------------
  // ✅ GET ALL ALERTS
  //---------------------------------------------
  getAllAlerts(): Observable<any> {
    return this.http
      .get<AlertObj[]>(ALERTS_URLS.alertsUrl, this.httpOptions)
      .pipe(
        tap((data: AlertObj[]) => {
          this.alertsSubject.next(data);
        }),
        catchError((err) => of(err.error.text))
      );
  }

  //---------------------------------------------
  // ✅ CREATE ALERT
  //---------------------------------------------
  createAlert(data: AlertObj): Observable<any> {
    return this.http
      .post<AlertObj>(ALERTS_URLS.alertsUrl, data, this.httpOptions)
      .pipe(
        switchMap((data: any) => {
          // After posting, fetch the updated list of alerts
          const msg = `Alert Creation ${data.ok}`;
          this.snackbarService.showSnackBar(msg, '', 3000, SnackbarType.Info);
          return this.http.get<AlertObj[]>(
            ALERTS_URLS.alertsUrl,
            this.httpOptions
          );
        }),
        tap((updatedAlerts: AlertObj[]) => {
          this.alertsSubject.next(updatedAlerts);
        }),
        catchError(this.handleError) // Handle errors for both POST and GET
      );
  }

  //---------------------------------------------
  // ✅ UPDATE ALERT
  //---------------------------------------------
  updateAlert(data: AlertObj) {
    return this.http
      .put<AlertObj>(ALERTS_URLS.alertsUpdateUrl, data, this.httpOptions)
      .pipe(
        switchMap((data: any) => {
          const msg = `Alert Update ${data.ok}`;
          this.snackbarService.showSnackBar(msg, '', 3000, SnackbarType.Info);
          return this.http.get<AlertObj[]>(
            ALERTS_URLS.alertsUrl,
            this.httpOptions
          );
        }),
        tap((updatedAlerts: AlertObj[]) => {
          this.alertsSubject.next(updatedAlerts);
        }),
        catchError(this.handleError)
      );
  }

  //---------------------------------------------
  // ✅ DELETE ALERT BATCH
  //---------------------------------------------
  deleteAlertsBatch(alerts: AlertObj[]) {
    const ids = alerts.map((a) => a.id);
    return this.http
      .delete<{ deleted: number }>(ALERTS_URLS.alertsBatchDelete, {
        ...this.httpOptions,
        body: ids,
      })
      .pipe(
        switchMap((data: any) => {
          const msg = `Deleted ${data.deleted} item(s)`;
          this.snackbarService.showSnackBar(msg, '', 3000, SnackbarType.Info);
          return this.http.get<AlertObj[]>(
            ALERTS_URLS.alertsUrl,
            this.httpOptions
          );
        }),
        tap((updatedAlerts: AlertObj[]) => {
          this.alertsSubject.next(updatedAlerts);
        }),
        catchError(this.handleError) // Handle errors for both POST and GET
      );
  }

  //---------------------------------------------
  // ✅ ARCHIVE ALERT
  //---------------------------------------------
  moveAlertToArchive(alert: AlertObj) {
    return this.http
      .post<AlertObj>(ALERTS_URLS.archiveAlert, alert, this.httpOptions)
      .pipe(
        switchMap((data: any) => {
          const msg = `Alert moved to Archive`;
          this.snackbarService.showSnackBar(msg, '', 3000, SnackbarType.Info);
          return this.http.get<AlertObj[]>(
            ALERTS_URLS.alertsUrl,
            this.httpOptions
          );
        }),
        tap((updatedAlerts: AlertObj[]) => {
          this.alertsSubject.next(updatedAlerts);
        }),
        catchError(this.handleError) // Handle errors for both POST and GET
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
