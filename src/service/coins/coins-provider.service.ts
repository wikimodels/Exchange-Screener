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
import { WORKING_COINS_URLS } from 'src/consts/url-consts';
import { SnackbarService } from '../snackbar.service';

@Injectable({ providedIn: 'root' })
export class CoinsProviderService {
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
  private coinsProviderSubject: BehaviorSubject<Coin[]> = new BehaviorSubject<
    Coin[]
  >([]);

  public coinsProvider$ = this.coinsProviderSubject.asObservable(); //

  public get Coins(): Coin[] {
    return this.coinsProviderSubject.value;
  }

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
  // ✅ GET ALL WORKING COINS
  //---------------------------------------------
  getAllCoins(): Observable<any> {
    return this.http
      .get<Coin[]>(COINS_PROVIDER_URLS.coinsProviderUrl, this.httpOptions)
      .pipe(
        tap((data: Coin[]) => {
          this.coinsProviderSubject.next(data);
        }),
        catchError(this.handleError)
      );
  }

  //-------------------------------------
  // ✅ RELOCATE TO COINS
  //--------------------------------------
  relocateToCoins(data: Coin[]): Observable<any> {
    return this.http
      .post<Coin>(
        COINS_PROVIDER_URLS.coinsProviderRelocateToCoinsUrl,
        data,
        this.httpOptions
      )
      .pipe(
        switchMap((data: any) => {
          const msg = `Coins successfully moved`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(
            COINS_PROVIDER_URLS.coinsProviderUrl,
            this.httpOptions
          );
        }),
        tap((coins: Coin[]) => {
          this.coinsProviderSubject.next(coins);
        }),
        catchError(this.handleError) // Handle errors for both POST and GET
      );
  }

  //--------------------------------
  // ✅ DELETE COIN ARRAY
  //--------------------------------
  deleteCoinArray(coins: Coin[]) {
    const symbols = coins.map((c) => c.symbol);
    return this.http
      .delete<Coin>(COINS_PROVIDER_URLS.coinsProviderDeleteManyUrl, {
        body: symbols,
        ...this.httpOptions,
      })
      .pipe(
        switchMap((data: any) => {
          const msg = `Coins deleted: ${data.deleted}`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(
            COINS_PROVIDER_URLS.coinsProviderUrl,
            this.httpOptions
          );
        }),
        tap((updatedCoins: Coin[]) => {
          this.coinsProviderSubject.next(updatedCoins);
        }),
        catchError(this.handleError) // Handle errors for both POST and GET
      );
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
  addCoinToBlackList(data: Coin[]): Observable<any> {
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
  // ✅ DELETE COIN FROM BLACK LISDT
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
