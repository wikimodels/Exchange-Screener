import { COINS_PROVIDER_URLS } from '../../consts/url-consts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { Coin } from 'models/shared/coin';
import { SnackbarService } from '../snackbar.service';

@Injectable({ providedIn: 'root' })
export class MissingCoinsService {
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

  //---------------------------------------------
  // ✴️ COIN GECKO MISSING
  //---------------------------------------------
  private coinGeckoMissingSubject: BehaviorSubject<Coin[]> =
    new BehaviorSubject<Coin[]>([]);

  public coinGeckoMissing$ = this.coinGeckoMissingSubject.asObservable(); //

  public get CoinGeckoMissing(): Coin[] {
    return this.coinGeckoMissingSubject.value;
  }

  //---------------------------------------------
  // ✴️ SANTIMENT MISSING
  //---------------------------------------------
  private santimentMissingSubject: BehaviorSubject<Coin[]> =
    new BehaviorSubject<Coin[]>([]);

  public santimentMissing$ = this.santimentMissingSubject.asObservable(); //

  public get santimentMissing(): Coin[] {
    return this.santimentMissingSubject.value;
  }

  //---------------------------------------------
  // ✅ GET COIN GECKO MISSING COINS
  //---------------------------------------------
  getCoinGeckoMissing(): Observable<any> {
    return this.http
      .get<Coin[]>(COINS_PROVIDER_URLS.coingeckoMissingUrl, this.httpOptions)
      .pipe(
        tap((data: Coin[]) => {
          this.coinGeckoMissingSubject.next(data);
        }),
        catchError(this.handleError)
      );
  }

  //---------------------------------------------
  // ✅ GET COIN GECKO MISSING COINS
  //---------------------------------------------
  getSantimentMissing(): Observable<any> {
    return this.http
      .get<Coin[]>(COINS_PROVIDER_URLS.santimentMissingUrl, this.httpOptions)
      .pipe(
        tap((data: Coin[]) => {
          this.santimentMissingSubject.next(data);
        }),
        catchError(this.handleError)
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
