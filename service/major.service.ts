import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'environment/environment';
import { Observable, map, catchError, throwError, retry, of } from 'rxjs';
//export { env } from './../environment/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'ngrok-skip-browser-warning': 'true', // Example header
  }),
};

@Injectable({ providedIn: 'root' })
export class MajorService {
  constructor(private http: HttpClient) {}

  getCollVwap15m(): Observable<any> {
    return this.http
      .get(env.baseUrl + '/collective-vwap-15m', httpOptions)
      .pipe(catchError((err) => of(err)));
  }

  getCollVwap1h(): Observable<any> {
    return this.http
      .get(env.baseUrl + '/collective-vwap-1h', httpOptions)
      .pipe(catchError((err) => of(err)));
  }

  getCollVwap4h(): Observable<any> {
    return this.http
      .get(env.baseUrl + '/collective-vwap-4h', httpOptions)
      .pipe(catchError((err) => of(err)));
  }
}
