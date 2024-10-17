import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertObj } from 'models/alerts/alert-obj';
import { Observable, map, catchError, throwError, retry, of, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'ngrok-skip-browser-warning': 'true', // Example header
  }),
};

@Injectable({ providedIn: 'root' })
export class AlertsService {
  private alerts: AlertObj[] = [];
  get Alerts() {
    return this.alerts;
  }
  constructor(private http: HttpClient) {}

  getAllAlerts(): Observable<any> {
    return this.http
      .get('http://localhost:80/get-all-alerts', httpOptions)
      .pipe(
        tap((data: any) => {
          this.alerts = data;
        }),
        catchError((err) => of(err.error.text))
      );
  }
}
