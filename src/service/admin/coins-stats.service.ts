import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, tap, catchError } from 'rxjs';
import { SnackbarService } from '../snackbar.service';
import { COINS_URLS } from 'src/consts/url-consts';

import { SnackbarType } from 'models/shared/snackbar-type';
import { CoinStatistics } from 'models/coin/coin-statistics';

@Injectable({ providedIn: 'root' })
export class CoinsStatisticsService {
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

  // BehaviorSubject to hold and emit CoinStatistics data
  private coinStatisticsSubject = new BehaviorSubject<CoinStatistics | null>(
    null
  );

  // Public observable for components to subscribe to
  public readonly coinStatistics$: Observable<CoinStatistics | null> =
    this.coinStatisticsSubject.asObservable();

  fetchStatistics(): Observable<CoinStatistics> {
    return this.http
      .get<CoinStatistics>(COINS_URLS.coinsRepoStatisticsUrl, this.httpOptions)
      .pipe(
        tap((data: CoinStatistics) => {
          this.snackbarService.showSnackBar(
            'Got Coins Statistics Data',
            '',
            3000,
            SnackbarType.Info
          );
          this.coinStatisticsSubject.next(data);
        }),
        catchError((error) => this.handleError(error))
      );
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
