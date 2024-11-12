import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { SnackbarService } from '../snackbar.service';
import { SnackbarType } from 'models/shared/snackbar-type';
import { BYBIT_WS_URLS } from 'src/consts/url-consts';

@Injectable({ providedIn: 'root' })
export class BybitWsConnManagerService {
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
  public bybitWsConnections$: Observable<any> =
    this.wsConnectionsResponseSubject.asObservable();

  // Method to update the wsConnectionsResponse
  updateWsConnectionsResponse(response: any): void {
    this.wsConnectionsResponseSubject.next(response);
  }

  public startWsConnections(): void {
    const options = { ...this.httpOptions };

    this.http.get<any>(BYBIT_WS_URLS.bybitWsStartUrl, options).subscribe({
      next: (data: any) => {
        this.snackbarService.showSnackBar(
          'Bybit WS Conns started...',
          '',
          3000,
          SnackbarType.Info
        );
        this.updateWsConnectionsResponse(data);
      },
      error: (error) => this.handleError(error),
    });
  }

  public pauseWsConnections(): void {
    const options = { ...this.httpOptions };

    this.http.get<any>(BYBIT_WS_URLS.bybitWsPauseUrl, options).subscribe({
      next: (data: any) => {
        this.snackbarService.showSnackBar(
          'Bybit WS Conns paused...',
          '',
          3000,
          SnackbarType.Info
        );
        this.updateWsConnectionsResponse(data);
      },
      error: (error) => this.handleError(error),
    });
  }

  public getWsConnectionsStatus(): void {
    const options = { ...this.httpOptions };

    this.http.get<any>(BYBIT_WS_URLS.bybitWsStatusUrl, options).subscribe({
      next: (data: any) => {
        this.snackbarService.showSnackBar(
          'Bybit WS Conns Status received',
          '',
          3000,
          SnackbarType.Info
        );
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
