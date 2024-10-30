import { COINS_URLS } from './../../consts/url-consts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  throwError,
  tap,
  BehaviorSubject,
  switchMap,
  of,
} from 'rxjs';
import { Coin } from 'models/shared/coin';
import { WORKING_COINS_URLS } from 'src/consts/url-consts';
import { SnackbarService } from '../snackbar.service';

@Injectable({ providedIn: 'root' })
export class CoinsService {
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
  // ✴️ COINS
  //---------------------------------------------
  private coinsSubject: BehaviorSubject<Coin[]> = new BehaviorSubject<Coin[]>(
    []
  );

  public coins$ = this.coinsSubject.asObservable(); //

  public get Coins(): Coin[] {
    return this.coinsSubject.value;
  }

  //---------------------------------------------
  // ✅ VALIDATOR
  //---------------------------------------------
  checkSymbolNameExists(symbol: string): Observable<any> {
    return of(this.coinsSubject.value.some((c) => c.symbol == symbol));
  }

  //---------------------------------------------
  // ✅ GET ALL WORKING COINS
  //---------------------------------------------
  getAllCoins(): Observable<any> {
    return this.http.get<Coin[]>(COINS_URLS.coinsUrl, this.httpOptions).pipe(
      tap((data: Coin[]) => {
        this.coinsSubject.next(data);
      }),
      catchError(this.handleError)
    );
  }

  //-------------------------------------
  // ✅ ADD COIN
  //--------------------------------------
  addCoins(data: Coin): Observable<any> {
    return this.http
      .post<Coin>(COINS_URLS.coinsAddUrl, data, this.httpOptions)
      .pipe(
        switchMap((data: any) => {
          const msg = `Coin successfully added`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(COINS_URLS.coinsUrl, this.httpOptions);
        }),
        tap((updatedAlerts: Coin[]) => {
          this.coinsSubject.next(updatedAlerts);
        }),
        catchError(this.handleError) // Handle errors for both POST and GET
      );
  }

  //--------------------------------
  // ✅ DELETE COIN
  //--------------------------------
  deleteCoins(coin: Coin) {
    const symbol = coin.symbol;
    return this.http
      .delete<Coin>(COINS_URLS.coinsDeleteOneUrl, {
        body: symbol,
        ...this.httpOptions,
      })
      .pipe(
        switchMap((data: any) => {
          const msg = `Coins deleted: ${data.deleted}`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(COINS_URLS.coinsUrl, this.httpOptions);
        }),
        tap((updatedCoins: Coin[]) => {
          this.coinsSubject.next(updatedCoins);
        }),
        catchError(this.handleError) // Handle errors for both POST and GET
      );
  }

  //-------------------------------
  // ✅ UPDATE COINS
  //-------------------------------
  deleteAllWorkingCoins() {
    return this.http
      .get(WORKING_COINS_URLS.workingCoinsDeleteAllUrl, this.httpOptions)
      .pipe(
        switchMap((data: any) => {
          const msg = `Coins deleted: ${data.deleted}`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(COINS_URLS.coinsUrl, this.httpOptions);
        }),
        tap((updatedCoins: Coin[]) => {
          this.coinsSubject.next(updatedCoins);
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
