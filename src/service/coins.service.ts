import { env } from 'environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  map,
  catchError,
  throwError,
  retry,
  of,
  tap,
  BehaviorSubject,
  switchMap,
} from 'rxjs';
import { Coin } from 'models/shared/coin';
import { ALERTS_URLS, coinsUrl } from 'src/consts/url-consts';
import { SnackbarService } from './snackbar.service';

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
  // ✴️ WORKING COINS
  //---------------------------------------------
  private workingCoinsSubject: BehaviorSubject<Coin[]> = new BehaviorSubject<
    Coin[]
  >([]);

  public workingCoins$ = this.workingCoinsSubject.asObservable(); //

  get WorkingCoins(): Coin[] {
    return this.workingCoinsSubject.value;
  }

  setWorkingCoins(coins: Coin[]) {
    this.workingCoinsSubject.next(coins);
  }

  //---------------------------------------------
  // ✅ COINS
  //---------------------------------------------
  getAllCoins(): Observable<any> {
    return this.http.get<Coin[]>(coinsUrl).pipe(
      tap((data: Coin[]) => {
        this.coinsSubject.next(data);
      }),
      catchError((error) => {
        // Handle the error
        console.error('Error fetching data:', error);
        // You can also display an error message or return a fallback value
        // Return an observable with a user-facing error message
        return throwError('Error fetching data; please try again later.');
      })
    );
  }

  //---------------------------------------------
  // ✅ VALIDATOR
  //---------------------------------------------
  checkSymbolNameExists(symbol: string): Observable<any> {
    return of(this.coinsSubject.value.some((c) => c.symbol == symbol));
  }

  //---------------------------------------------
  // ✅ WORKING COINS
  //---------------------------------------------

  getAllWorkingCoins(): Observable<any> {
    return this.http
      .get<Coin[]>(ALERTS_URLS.getAllWorkingCoinsUrls, this.httpOptions)
      .pipe(
        tap((data: Coin[]) => {
          this.workingCoinsSubject.next(data);
        }),
        catchError(this.handleError)
      );
  }

  addWorkingCoins(data: Coin[]): Observable<any> {
    return this.http
      .post<Coin[]>(ALERTS_URLS.addWorkingCoinsUrl, data, this.httpOptions)
      .pipe(
        switchMap((data: any) => {
          // After posting, fetch the updated list of alerts
          const msg = `Coin successfully added`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(
            ALERTS_URLS.getAllWorkingCoinsUrls,
            this.httpOptions
          );
        }),
        tap((updatedAlerts: Coin[]) => {
          // Update the BehaviorSubject with the fresh list of alerts from the server
          this.workingCoinsSubject.next(updatedAlerts);
        }),
        catchError(this.handleError) // Handle errors for both POST and GET
      );
  }

  deleteAllWorkingCoins() {
    return this.http
      .get(ALERTS_URLS.deleteAllWorkingCoinsUrl, this.httpOptions)
      .pipe(
        switchMap((data: any) => {
          const msg = `Working Coins deleted: ${data.deleted}`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(
            ALERTS_URLS.getAllWorkingCoinsUrls,
            this.httpOptions
          );
        }),
        tap((updatedCoins: Coin[]) => {
          this.workingCoinsSubject.next(updatedCoins);
        }),
        catchError(this.handleError)
      );
  }

  deleteWorkingCoinsButch(coins: Coin[]) {
    return this.http
      .post<Coin[]>(
        ALERTS_URLS.deleteWorkingCoinsButchUrl,
        coins,
        this.httpOptions
      )
      .pipe(
        switchMap((data: any) => {
          const msg = `Working Coins deleted: ${data.deleted}`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(
            ALERTS_URLS.getAllWorkingCoinsUrls,
            this.httpOptions
          );
        }),
        tap((updatedCoins: Coin[]) => {
          this.workingCoinsSubject.next(updatedCoins);
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
