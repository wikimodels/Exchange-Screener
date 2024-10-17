import { env } from 'environment/environment';
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

const httpOptions = {
  headers: new HttpHeaders({
    'ngrok-skip-browser-warning': 'true', // Example header
  }),
};

@Injectable({ providedIn: 'root' })
export class AlertsService {
  constructor(private http: HttpClient) {}
  private alertsSubject: BehaviorSubject<AlertObj[]> = new BehaviorSubject<
    AlertObj[]
  >([]);

  public alerts$ = this.alertsSubject.asObservable(); // Expose the alerts as an observable
  // Getter to get the current value of alerts (using .value)
  get Alerts(): AlertObj[] {
    return this.alertsSubject.value;
  }
  // Getter to get the current value of alerts (using .value)

  getAllAlerts(): Observable<any> {
    return this.http.get<AlertObj[]>(env.allAlertsUrl, httpOptions).pipe(
      tap((data: AlertObj[]) => {
        this.alertsSubject.next(data); // Update BehaviorSubject with new data
      }),
      catchError((err) => of(err.error.text))
    );
  }

  // Create a new alert and update BehaviorSubject
  createAlert(data: AlertObj): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // First, post the new alert, then switch to fetching the updated list
    return this.http.post<AlertObj>(env.createAlertUrl, data, { headers }).pipe(
      switchMap(() => {
        // After posting, fetch the updated list of alerts
        return this.http.get<AlertObj[]>(env.allAlertsUrl, httpOptions);
      }),
      tap((updatedAlerts: AlertObj[]) => {
        // Update the BehaviorSubject with the fresh list of alerts from the server
        this.alertsSubject.next(updatedAlerts);
      }),
      catchError(this.handleError) // Handle errors for both POST and GET
    );
  }

  // Handle errors in HTTP request
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log to console or send to a logging service
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
