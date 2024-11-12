import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { SnackbarService } from '../snackbar.service';

import { SnackbarType } from 'models/shared/snackbar-type';
import { BINACE_WS_URLS, SANTIMENT_URLS } from 'src/consts/url-consts';

@Injectable({ providedIn: 'root' })
export class BinanceWsConnManagerService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  // Create a BehaviorSubject for JSON objects, initialized with an empty object
  private wsConnectionsResponseSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>({});

  // Expose the observable
  public binanceWsConnections$: Observable<any> =
    this.wsConnectionsResponseSubject.asObservable();

  // Method to update the wsConnectionsResponse
  updateWsConnectionsResponse(response: any): void {
    this.wsConnectionsResponseSubject.next(response);
  }

  public startWsConnections(): void {
    const options = { ...this.httpOptions };

    this.http.get<any>(BINACE_WS_URLS.binanceWsStartUrl, options).subscribe({
      next: (data: any) => {
        this.updateWsConnectionsResponse(data);
      },
      error: (error) => this.handleError(error),
    });
  }

  public pauseWsConnections(): void {
    const options = { ...this.httpOptions };

    this.http.get<any>(BINACE_WS_URLS.binanceWsPauseUrl, options).subscribe({
      next: (data: any) => {
        this.updateWsConnectionsResponse(data);
      },
      error: (error) => this.handleError(error),
    });
  }

  public getWsConnectionsStatus(): void {
    const options = { ...this.httpOptions };

    this.http.get<any>(BINACE_WS_URLS.binanceWsStatusUrl, options).subscribe({
      next: (data: any) => {
        this.updateWsConnectionsResponse(data);
      },
      error: (error) => this.handleError(error),
    });
  }

  //---------------------------------------------
  // ✅ ERROR HANDLING
  //---------------------------------------------
  private handleError(error: Error): Observable<never> {
    console.error('An error occurred:', error);
    const msg = 'ERROR: ' + error.message;
    this.snackbarService.showSnackBar(msg, '', 8000, SnackbarType.Error);
    return throwError(() => new Error('Something went wrong! ', error));
  }
}
