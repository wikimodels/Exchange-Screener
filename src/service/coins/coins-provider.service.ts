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
  // ✴️ COINS PROVIDER
  //---------------------------------------------
  private coinsProviderSubject: BehaviorSubject<Coin[]> = new BehaviorSubject<
    Coin[]
  >([]);

  public coinsProvider$ = this.coinsProviderSubject.asObservable(); //

  public get Coins(): Coin[] {
    return this.coinsProviderSubject.value;
  }

  //---------------------------------------------
  // ✴️ COINS PROVIDER
  //---------------------------------------------
  private refreshmentProcedureSubject: BehaviorSubject<{ finish: boolean }> =
    new BehaviorSubject<{ finish: boolean }>({ finish: false });

  public refreshmentProcedure$ =
    this.refreshmentProcedureSubject.asObservable(); //

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

  //---------------------------------------------
  // ✅ GET ALL WORKING COINS
  //---------------------------------------------
  runRefreshmentProcedure(): Observable<any> {
    return this.http
      .get<any>(
        COINS_PROVIDER_URLS.coinsProviderRunRefreshmentProcedureUrl,
        this.httpOptions
      )
      .pipe(
        tap((data: { finish: boolean }) => {
          const msg = 'Procedure finished';
          this.snackbarService.showSnackBar(msg, '');
          this.refreshmentProcedureSubject.next(data);
        }),
        catchError(this.handleError)
      );
  }

  //-------------------------------------
  // ✅ RELOCATE TO COINS
  //--------------------------------------
  relocateToCoins(data: Coin[]): Observable<any> {
    return this.http
      .post<Coin[]>(
        COINS_PROVIDER_URLS.coinsProviderRelocateToCoinsUrl,
        data,
        this.httpOptions
      )
      .pipe(
        switchMap((data: any) => {
          console.log(data);
          const msg = `Inserted: ${data.insertionResult.insertedCount} Deleted ${data.deletionResult.deletedCount}`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(
            COINS_PROVIDER_URLS.coinsProviderUrl,
            this.httpOptions
          );
        }),
        tap((coins: Coin[]) => {
          console.log('COINS REFRESH ---> done', coins.length);
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
          const msg = `Coins deleted: ${data.deletedCount}`;
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
