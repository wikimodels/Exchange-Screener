import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, catchError, tap } from 'rxjs';
import { SnackbarService } from '../snackbar.service';

import { SnackbarType } from 'models/shared/snackbar-type';
import { Alert } from 'models/alerts/alert';
import { SANTIMENT_URLS } from 'src/consts/url-consts';

@Injectable({ providedIn: 'root' })
export class SantimentGenericService {
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

  private santimentCollections: Map<string, BehaviorSubject<any[]>> = new Map();

  private getOrCreateCollection(symbol: string): BehaviorSubject<Alert[]> {
    if (!this.santimentCollections.has(symbol)) {
      this.santimentCollections.set(symbol, new BehaviorSubject<any[]>([]));
    }
    return this.santimentCollections.get(symbol)!;
  }

  public santiment$(symbol: string): Observable<any[]> {
    return this.getOrCreateCollection(symbol).asObservable();
  }

  public setSantiment(symbol: string, data: any[]): void {
    const santimentCollection = this.getOrCreateCollection(symbol);
    santimentCollection.next(data);
  }

  public getLocalSantiment(symbol: string): any[] {
    return this.getOrCreateCollection(symbol).value;
  }

  public getSantimentDataMissingCoins() {
    const options = { ...this.httpOptions };

    return this.http.get<any[]>(SANTIMENT_URLS.dataMissingUrl, options).pipe(
      tap((data) => {
        this.snackbarService.showSnackBar(
          'Got Santiment Data',
          '',
          3000,
          SnackbarType.Info
        );
        return data;
      }),
      catchError((error) => {
        this.handleError(error); // Handle the error as needed
        return throwError(() => error); // Re-throw the error for further handling
      })
    );
  }

  public getHttpSantiment(symbol: string): void {
    const params = this.createHttpParams({ symbol });
    const options = { ...this.httpOptions, params };

    this.http.get<any[]>(SANTIMENT_URLS.echartsUrl, options).subscribe({
      next: (data: any[]) => {
        this.setSantiment(symbol, data);
      },
      error: (error) => this.handleError(error),
    });
  }

  private createHttpParams(params?: { [key: string]: any }): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      for (const key of Object.keys(params)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
    return httpParams;
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
