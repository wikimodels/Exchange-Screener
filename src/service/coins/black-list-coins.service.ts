import { COINS_PROVIDER_URLS } from '../../consts/url-consts';
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
import { SnackbarService } from '../snackbar.service';

@Injectable({ providedIn: 'root' })
export class BlackListCoinsService {
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
  // ✴️ BLACK LIST
  //---------------------------------------------
  private coinsProviderBlackListSubject: BehaviorSubject<Coin[]> =
    new BehaviorSubject<Coin[]>([]);

  public coinsProviderBlackList$ =
    this.coinsProviderBlackListSubject.asObservable(); //

  public get CoinsBlackList(): Coin[] {
    return this.coinsProviderBlackListSubject.value;
  }

  //-------------------------------
  // ✅ GET BLACK LIST
  //-------------------------------
  getCoinsBlackList(): Observable<any> {
    return this.http
      .get<Coin[]>(COINS_PROVIDER_URLS.blackListUrl, this.httpOptions)
      .pipe(
        tap((data: Coin[]) => {
          this.coinsProviderBlackListSubject.next(data);
        }),
        catchError(this.handleError)
      );
  }

  //-------------------------------------
  // ✅ ADD COIN TO BLACK LIST
  //--------------------------------------
  addCoinToBlackList(data: Coin): Observable<any> {
    return this.http
      .post<Coin>(
        COINS_PROVIDER_URLS.blackListAddOneUrl,
        data,
        this.httpOptions
      )
      .pipe(
        switchMap((data: any) => {
          const msg = `Coins successfully added`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(
            COINS_PROVIDER_URLS.blackListUrl,
            this.httpOptions
          );
        }),
        tap((coins: Coin[]) => {
          this.coinsProviderBlackListSubject.next(coins);
        }),
        catchError(this.handleError) // Handle errors for both POST and GET
      );
  }

  //-------------------------------------
  // ✅ ADD COIN TO BLACK LIST
  //--------------------------------------
  addCoinArrayToBlackList(data: Coin[]): Observable<any> {
    return this.http
      .post<Coin[]>(
        COINS_PROVIDER_URLS.blackListAddManyUrl,
        data,
        this.httpOptions
      )
      .pipe(
        switchMap((data: any) => {
          console.log(data);
          const msg = `Inserted: ${data.insertionResult.insertedCount} Deleted: ${data.deletionResult.deletedCount}`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(
            COINS_PROVIDER_URLS.blackListUrl,
            this.httpOptions
          );
        }),
        tap((coins: Coin[]) => {
          this.coinsProviderBlackListSubject.next(coins);
        }),
        catchError(this.handleError) // Handle errors for both POST and GET
      );
  }

  //-------------------------------------
  // ✅ DELETE COIN FROM BLACK LIST
  //--------------------------------------
  deleteCoinFromBlackList(coin: Coin) {
    const symbol = coin.symbol;
    return this.http
      .delete(COINS_PROVIDER_URLS.blackListRemoveOne, {
        body: symbol,
        ...this.httpOptions,
      })
      .pipe(
        switchMap((data: any) => {
          const msg = `Coins deleted: ${data.deleted}`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(
            COINS_PROVIDER_URLS.blackListUrl,
            this.httpOptions
          );
        }),
        tap((updatedCoins: Coin[]) => {
          this.coinsProviderBlackListSubject.next(updatedCoins);
        }),
        catchError(this.handleError)
      );
  }

  //-------------------------------------
  // ✅ DELETE COIN ARRAY FROM BLACK LISDT
  //--------------------------------------
  deleteCoinArrayFromBlackList(coins: Coin[]) {
    const symbols = coins.map((c) => c.symbol);
    return this.http
      .delete(COINS_PROVIDER_URLS.blackListRemoveMany, {
        body: symbols,
        ...this.httpOptions,
      })
      .pipe(
        switchMap((data: any) => {
          const msg = `Coins deleted: ${data.deletedCount}`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(
            COINS_PROVIDER_URLS.blackListUrl,
            this.httpOptions
          );
        }),
        tap((updatedCoins: Coin[]) => {
          this.coinsProviderBlackListSubject.next(updatedCoins);
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
