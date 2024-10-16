import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, retry, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'ngrok-skip-browser-warning': 'true', // Example header
  }),
};

@Injectable({ providedIn: 'root' })
export class AlertsService {
  constructor(private http: HttpClient) {}

  getAllAlerts(): Observable<any> {
    return this.http
      .get('http://localhost:80/get-all-alerts', httpOptions)
      .pipe(catchError((err) => of(err.error.text)));
  }
}
