import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  throwError,
  of,
  tap,
  BehaviorSubject,
  switchMap,
} from 'rxjs';
import { Coin } from 'models/shared/coin';
import { WORKING_COINS_URLS } from 'src/consts/url-consts';
import { SnackbarService } from '../snackbar.service';

@Injectable({ providedIn: 'root' })
export class WorkingCoinsService {
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
  // ✅ GET ALL WORKING COINS
  //---------------------------------------------
  getAllWorkingCoins(): Observable<any> {
    return this.http
      .get<Coin[]>(WORKING_COINS_URLS.workingCoinsUrl, this.httpOptions)
      .pipe(
        tap((data: Coin[]) => {
          this.workingCoinsSubject.next(data);
        }),
        catchError(this.handleError)
      );
  }

  //---------------------------------------------
  // ✅ ADD WORKING COINS
  //---------------------------------------------
  addWorkingCoins(data: Coin[]): Observable<any> {
    return this.http
      .post<Coin[]>(
        WORKING_COINS_URLS.workingCoinsAddUrl,
        data,
        this.httpOptions
      )
      .pipe(
        switchMap((data: any) => {
          const msg = `Coin successfully added`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(
            WORKING_COINS_URLS.workingCoinsUrl,
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

  //---------------------------------------------
  // ✅ DELETE WORKING COINS BATCH
  //---------------------------------------------
  deleteWorkingCoinsBatch(coins: Coin[]) {
    const symbols = coins.map((c) => c.symbol);
    return this.http
      .delete<Coin[]>(WORKING_COINS_URLS.workingCoinsDeleteBatchUrl, {
        body: symbols,
        ...this.httpOptions,
      })
      .pipe(
        switchMap((data: any) => {
          const msg = `Working Coins deleted: ${data.deleted}`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(
            WORKING_COINS_URLS.workingCoinsUrl,
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
  // ✅ DELETE ALL WORKING COINS
  //---------------------------------------------
  deleteAllWorkingCoins() {
    return this.http
      .get(WORKING_COINS_URLS.workingCoinsDeleteAllUrl, this.httpOptions)
      .pipe(
        switchMap((data: any) => {
          const msg = `Working Coins deleted: ${data.deleted}`;
          this.snackbarService.showSnackBar(msg, '');
          return this.http.get<Coin[]>(
            WORKING_COINS_URLS.workingCoinsUrl,
            this.httpOptions
          );
        }),
        tap((updatedCoins: Coin[]) => {
          this.workingCoinsSubject.next(updatedCoins);
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
