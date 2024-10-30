import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ARCHIVED_ALERTS_URLS } from 'src/consts/url-consts';
import { AlertObj } from 'models/alerts/alert-obj';
import {
  Observable,
  catchError,
  throwError,
  of,
  tap,
  BehaviorSubject,
  switchMap,
} from 'rxjs';
import { SnackbarService } from '../snackbar.service';
import { SnackbarType } from 'models/shared/snackbar-type';

@Injectable({ providedIn: 'root' })
export class ArchivedAlertsService {
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
  // ✴️ ARCHIVED ALERTS OBSERVABLE
  //---------------------------------------------
  private alertsArchivedSubject: BehaviorSubject<AlertObj[]> =
    new BehaviorSubject<AlertObj[]>([]);

  public alertsArchived$ = this.alertsArchivedSubject.asObservable();

  get AlertsArchived(): AlertObj[] {
    return this.alertsArchivedSubject.value;
  }

  //---------------------------------------------
  // ✅ GET ALL ARCHIVED ALERTS
  //---------------------------------------------
  getAllArchivedAlerts(): Observable<any> {
    return this.http
      .get<AlertObj[]>(ARCHIVED_ALERTS_URLS.archivedAlertsUrl, this.httpOptions)
      .pipe(
        tap((data: AlertObj[]) => {
          this.alertsArchivedSubject.next(data);
        }),
        catchError((err) => of(err.error.text))
      );
  }

  //---------------------------------------------
  // ✅ UPDATE ALERT THROUGH TRIGGERED
  //---------------------------------------------
  updateAlertViaTriggered(data: AlertObj) {
    return this.http
      .put<AlertObj>(
        ARCHIVED_ALERTS_URLS.archivedAlertsUpdateOneUrl,
        data,
        this.httpOptions
      )
      .pipe(
        switchMap((data: any) => {
          const msg = `Alert Update ${data.ok}`;
          this.snackbarService.showSnackBar(msg, '', 3000, SnackbarType.Info);
          return this.http.get<AlertObj[]>(
            ARCHIVED_ALERTS_URLS.archivedAlertsUrl,
            this.httpOptions
          );
        }),
        tap((updatedAlerts: AlertObj[]) => {
          this.alertsArchivedSubject.next(updatedAlerts);
        }),
        catchError(this.handleError)
      );
  }

  //---------------------------------------------
  // ✅ DELELTE ARCHIVED ALERTS BATCH
  //---------------------------------------------
  deleteArchivedAlertsBatch(alerts: AlertObj[]) {
    const ids = alerts.map((a) => a.id);
    return this.http
      .delete<AlertObj>(ARCHIVED_ALERTS_URLS.archivedAlertsDeleteBatchUrl, {
        ...this.httpOptions,
        body: ids,
      })
      .pipe(
        switchMap((data: any) => {
          const msg = `Deleted ${data.deleted} item(s)`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<AlertObj[]>(
            ARCHIVED_ALERTS_URLS.archivedAlertsUrl,
            this.httpOptions
          );
        }),
        tap((updatedAlerts: AlertObj[]) => {
          this.alertsArchivedSubject.next(updatedAlerts);
        }),
        catchError(this.handleError) // Handle errors for both POST and GET
      );
  }

  //---------------------------------------------
  // ✅ DELELTE all ARCHIVED ALERTS
  //---------------------------------------------
  deleteAllArchivedAlerts() {
    return this.http
      .get<AlertObj>(
        ARCHIVED_ALERTS_URLS.archivedAlertsDeleteBatchUrl,
        this.httpOptions
      )
      .pipe(
        switchMap((data: any) => {
          const msg = `Deleted ${data.deleted} item(s)`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<AlertObj[]>(
            ARCHIVED_ALERTS_URLS.archivedAlertsUrl,
            this.httpOptions
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
