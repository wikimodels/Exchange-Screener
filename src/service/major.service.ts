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
}
