import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, tap } from 'rxjs';
import { Coin } from 'models/coin/coin';
import { SnackbarService } from '../snackbar.service';
import { COINS_URLS } from 'src/consts/url-consts';
import {
  DeleteResult,
  InsertResult,
  ModifyResult,
} from 'models/mongodb/operations';
import { SnackbarType } from 'models/shared/snackbar-type';
import { CoinUpdateData } from 'models/coin/coin-update-data';

@Injectable({ providedIn: 'root' })
export class CoinsGenericService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  // Unified collection of coins
  private coinsSubject = new BehaviorSubject<Coin[]>([]);
  public coins$ = this.coinsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  //---------------------------------------------
  // ✅ GETTER AND SETTER FOR COINS
  //---------------------------------------------
  public setCoins(coins: Coin[]): void {
    this.coinsSubject.next(coins);
  }

  public getCoins(): Coin[] {
    return this.coinsSubject.value;
  }

  //---------------------------------------------
  // ✅ CRUD OPERATIONS
  //---------------------------------------------

  // Load all coins from the server
  public loadCoins(collectionName: string): void {
    const params = new HttpParams().set('collectionName', collectionName);
    this.http
      .get<Coin[]>(COINS_URLS.coinsByCollectionNameUrl, {
        ...this.httpOptions,
        params, // Add the query parameters here
      })
      .subscribe({
        next: (coins: Coin[]) => {
          this.setCoins(coins);
        },
        error: (error) => this.handleError(error),
      });
  }

  // Add a single coin
  public addOne(coin: Coin): void {
    const currentCoins = this.getCoins();
    this.setCoins([...currentCoins, coin]);

    this.http
      .post<InsertResult>(
        `${COINS_URLS.coinsAddOneUrl}`,
        coin,
        this.httpOptions
      )
      .subscribe({
        next: (response: InsertResult) => {
          const msg = `Document inserted ${response.insertedCount}`;
          this.snackbarService.showSnackBar(msg, '');
        },
        error: (error) => this.handleError(error),
      });
  }

  // Add multiple coins
  public addMany(coins: Coin[]): void {
    const currentCoins = this.getCoins();
    this.setCoins([...currentCoins, ...coins]);

    this.http
      .post<InsertResult>(
        `${COINS_URLS.coinsAddManyUrl}`,
        coins,
        this.httpOptions
      )
      .subscribe({
        next: (response: InsertResult) => {
          const msg = `Documents inserted ${response.insertedCount}`;
          this.snackbarService.showSnackBar(msg, '');
        },
        error: (error) => this.handleError(error),
      });
  }

  // Delete multiple coins
  public deleteMany(symbols: string[]): void {
    const currentCoins = this.getCoins();
    const remainingCoins = currentCoins.filter(
      (coin) => !symbols.includes(coin.symbol)
    );
    this.setCoins(remainingCoins);

    const options = {
      ...this.httpOptions,
      body: { symbols },
    };

    this.http
      .delete<DeleteResult>(`${COINS_URLS.coinsDeleteManyUrl}`, options)
      .subscribe({
        next: (response: DeleteResult) => {
          const msg = `Documents deleted ${response.deletedCount}`;
          this.snackbarService.showSnackBar(msg, '');
        },
        error: (error) => this.handleError(error),
      });
  }

  // Update a single coin
  public updateOne(updateData: CoinUpdateData): void {
    const currentCoins = this.getCoins();
    const updatedCoins = currentCoins.map((coin) =>
      coin.symbol === updateData.symbol
        ? { ...coin, ...updateData.propertiesToUpdate }
        : coin
    );
    this.setCoins(updatedCoins);

    const options = { ...this.httpOptions };

    this.http
      .put<ModifyResult>(`${COINS_URLS.coinsUpdateOneUrl}`, updateData, options)
      .subscribe({
        next: (response: ModifyResult) => {
          const msg = `Documents modified ${response.modifiedCount}`;
          this.snackbarService.showSnackBar(msg, '');
        },
        error: (error) => this.handleError(error),
      });
  }

  // Update multiple coins
  public updateMany(updatedData: Array<CoinUpdateData>): void {
    // Send updated data to the server
    this.http
      .put<ModifyResult>(
        `${COINS_URLS.coinsUpdateManyUrl}`,
        updatedData,
        this.httpOptions
      )
      .pipe(
        tap((response: ModifyResult) => {
          const msg = `Documents modified ${response.modifiedCount}`;
          this.snackbarService.showSnackBar(msg, '');
        })
      )
      .subscribe({
        next: (response: any) => {},
        error: (error) => this.handleError(error),
      });
  }

  //---------------------------------------------
  // ✅ HELPER METHODS
  //---------------------------------------------

  private createHttpParams(params?: { [key: string]: any }): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      for (const key of Object.keys(params)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
    return httpParams;
  }

  private handleError(error: Error): Observable<never> {
    console.error('An error occurred:', error);
    const msg = 'ERROR: ' + error.message;
    this.snackbarService.showSnackBar(msg, '', 8000, SnackbarType.Error);
    return throwError(() => new Error('Something went wrong! ', error));
  }
}
