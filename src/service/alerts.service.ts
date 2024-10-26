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
import { SnackbarService } from './snackbar.service';
import { SnackbarType } from 'models/shared/snackbar-type';

const httpOptions = {
  headers: new HttpHeaders({
    'ngrok-skip-browser-warning': 'true', // Example header
  }),
};

@Injectable({ providedIn: 'root' })
export class AlertsService {
  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}

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
  // ✴️ TRIGGERED ALERTS OBSERVABLE
  //---------------------------------------------
  private alertsTriggeredSubject: BehaviorSubject<AlertObj[]> =
    new BehaviorSubject<AlertObj[]>([]);

  public alertsTriggered$ = this.alertsTriggeredSubject.asObservable(); //

  get AlertsTriggered(): AlertObj[] {
    return this.alertsTriggeredSubject.value;
  }

  //---------------------------------------------
  // ✴️ ARCHIVED ALERTS OBSERVABLE
  //---------------------------------------------
  private alertsArchivedSubject: BehaviorSubject<AlertObj[]> =
    new BehaviorSubject<AlertObj[]>([]);

  public alertsArchived$ = this.alertsArchivedSubject.asObservable();

  get AlertsArchived(): AlertObj[] {
    return this.alertsArchivedSubject.value;
  }

  //---------------------------------------------
  // ✅ ALERTS AT WORK
  //---------------------------------------------
  getAllAlerts(): Observable<any> {
    return this.http
      .get<AlertObj[]>(ALERTS_URLS.allAlertsUrl, httpOptions)
      .pipe(
        tap((data: AlertObj[]) => {
          this.alertsSubject.next(data);
        }),
        catchError((err) => of(err.error.text))
      );
  }

  createAlert(data: AlertObj): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // First, post the new alert, then switch to fetching the updated list
    return this.http
      .post<AlertObj>(ALERTS_URLS.createAlertUrl, data, { headers })
      .pipe(
        switchMap((data: any) => {
          // After posting, fetch the updated list of alerts
          const msg = `Alert Creation ${data.ok}`;
          this.snackbarService.showSnackBar(msg, '', 3000, SnackbarType.Info);
          return this.http.get<AlertObj[]>(
            ALERTS_URLS.allAlertsUrl,
            httpOptions
          );
        }),
        tap((updatedAlerts: AlertObj[]) => {
          // Update the BehaviorSubject with the fresh list of alerts from the server
          this.alertsSubject.next(updatedAlerts);
        }),
        catchError(this.handleError) // Handle errors for both POST and GET
      );
  }

  updateAlert(data: AlertObj) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .post<AlertObj>(ALERTS_URLS.updateAlertUrl, data, { headers })
      .pipe(
        switchMap((data: any) => {
          const msg = `Alert Update ${data.ok}`;
          this.snackbarService.showSnackBar(msg, '', 3000, SnackbarType.Info);
          return this.http.get<AlertObj[]>(
            ALERTS_URLS.allAlertsUrl,
            httpOptions
          );
        }),
        tap((updatedAlerts: AlertObj[]) => {
          this.alertsSubject.next(updatedAlerts);
        }),
        catchError(this.handleError)
      );
  }

  deleteAlertsButch(alerts: AlertObj[]) {
    const ids = alerts.map((a) => a.id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<AlertObj>(ALERTS_URLS.deleteAlertsButchUrl, ids, { headers })
      .pipe(
        switchMap((data: any) => {
          const msg = `Deleted ${data.deleted} item(s)`;
          this.snackbarService.showSnackBar(msg, '', 3000, SnackbarType.Info);
          return this.http.get<AlertObj[]>(
            ALERTS_URLS.allAlertsUrl,
            httpOptions
          );
        }),
        tap((updatedAlerts: AlertObj[]) => {
          this.alertsSubject.next(updatedAlerts);
        }),
        catchError(this.handleError) // Handle errors for both POST and GET
      );
  }

  moveAlertToArchive(alert: AlertObj) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .post<AlertObj>(ALERTS_URLS.createArchiveAlertUrl, alert, { headers })
      .pipe(
        switchMap((data: any) => {
          const msg = `Alert move to Archive`;
          this.snackbarService.showSnackBar(msg, '', 3000, SnackbarType.Info);
          return this.http.get<AlertObj[]>(
            ALERTS_URLS.allAlertsUrl,
            httpOptions
          );
        }),
        tap((updatedAlerts: AlertObj[]) => {
          this.alertsSubject.next(updatedAlerts);
        }),
        catchError(this.handleError) // Handle errors for both POST and GET
      );
  }

  //---------------------------------------------
  // ✅ TRIGGERED ALERTS
  //---------------------------------------------
  getAllTriggeredAlerts(): Observable<any> {
    return this.http
      .get<AlertObj[]>(ALERTS_URLS.allTriggeredAlertsUrl, httpOptions)
      .pipe(
        tap((data: AlertObj[]) => {
          this.alertsTriggeredSubject.next(data);
        }),
        catchError((err) => of(err.error.text))
      );
  }

  deleteTriggeredAlerts(alerts: AlertObj[]) {
    const ids = alerts.map((a) => a.id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<AlertObj>(ALERTS_URLS.deleteAlertsTriggeredButchUrl, ids, {
        headers,
      })
      .pipe(
        switchMap((data: any) => {
          const msg = `Deleted ${data.deleted} items`;
          this.snackbarService.showSnackBar(msg, '', 3000, SnackbarType.Info);

          return this.http.get<AlertObj[]>(
            ALERTS_URLS.allTriggeredAlertsUrl,
            httpOptions
          );
        }),
        tap((updatedAlerts: AlertObj[]) => {
          this.alertsTriggeredSubject.next(updatedAlerts);
        }),
        catchError(this.handleError)
      );
  }

  //---------------------------------------------
  // ✅ ARCHIVED ALERTS
  //---------------------------------------------
  getAllArchivedAlerts(): Observable<any> {
    return this.http
      .get<AlertObj[]>(ALERTS_URLS.allArchivedAlertsUrl, httpOptions)
      .pipe(
        tap((data: AlertObj[]) => {
          this.alertsArchivedSubject.next(data);
        }),
        catchError((err) => of(err.error.text))
      );
  }

  deleteAlertsArchived(alerts: AlertObj[]) {
    const ids = alerts.map((a) => a.id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<AlertObj>(ALERTS_URLS.deleteAlertsArchivedButchUrl, ids, {
        headers,
      })
      .pipe(
        switchMap((data: any) => {
          const msg = `Deleted ${data.deleted} item(s)`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<AlertObj[]>(
            ALERTS_URLS.allArchivedAlertsUrl,
            httpOptions
          );
        }),
        tap((updatedAlerts: AlertObj[]) => {
          this.alertsArchivedSubject.next(updatedAlerts);
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
