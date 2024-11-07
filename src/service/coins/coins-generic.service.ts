import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Coin } from 'models/coin/coin';
import { SnackbarService } from '../snackbar.service';
import { COINS_URLS } from 'src/consts/url-consts';
import {
  DeleteResult,
  InsertResult,
  ModifyResult,
  MoveResult,
} from 'models/mongodb/operations';
import { SnackbarType } from 'models/shared/snackbar-type';

@Injectable({ providedIn: 'root' })
export class CoinsGenericService {
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

  private coinCollections: Map<string, BehaviorSubject<Coin[]>> = new Map();

  private getOrCreateCollection(
    collectionName: string
  ): BehaviorSubject<Coin[]> {
    if (!this.coinCollections.has(collectionName)) {
      this.coinCollections.set(collectionName, new BehaviorSubject<Coin[]>([]));
    }
    return this.coinCollections.get(collectionName)!;
  }

  public coins$(collectionName: string): Observable<Coin[]> {
    return this.getOrCreateCollection(collectionName).asObservable();
  }

  public setCoins(collectionName: string, coins: Coin[]): void {
    const coinCollection = this.getOrCreateCollection(collectionName);
    coinCollection.next(coins);
  }

  public getCoins(collectionName: string): Coin[] {
    return this.getOrCreateCollection(collectionName).value;
  }

  public getAllCoins(collectionName: string): void {
    const params = this.createHttpParams({ collectionName });
    const options = { ...this.httpOptions, params };

    this.http.get<Coin[]>(COINS_URLS.coinsUrl, options).subscribe({
      next: (coins: Coin[]) => {
        this.setCoins(collectionName, coins);
      },
      error: (error) => this.handleError(error),
    });
  }

  public addOne(collectionName: string, coin: Coin): void {
    const currentCoins = this.getCoins(collectionName);
    this.setCoins(collectionName, [...currentCoins, coin]);

    // HTTP request to add a coin with query parameters
    const params = this.createHttpParams({ collectionName });
    const options = { ...this.httpOptions, params };

    this.http
      .post<InsertResult>(`${COINS_URLS.coinsAddOneUrl}`, coin, options)
      .subscribe({
        next: (response: InsertResult) => {
          const msg = `Document inserted ${response.insertedCount}`;
          this.snackbarService.showSnackBar(msg, '');
        },
        error: (error) => this.handleError(error),
      });
  }

  public deleteMany(collectionName: string, symbols: string[]): void {
    const currentCoins = this.getCoins(collectionName);
    const remainingCoins = currentCoins.filter(
      (coin) => !symbols.includes(coin.symbol)
    );
    this.setCoins(collectionName, remainingCoins);

    const params = this.createHttpParams({ collectionName });

    const options = {
      ...this.httpOptions,
      params: params,
      body: { symbols },
    };
    console.log('Options ---> ', options);
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

  public updateOne(
    collectionName: string,
    symbol: string,
    updatedData: Partial<Coin>
  ): void {
    const currentCoins = this.getCoins(collectionName);
    const updatedCoins = currentCoins.map((coin) =>
      coin.symbol === symbol ? { ...coin, ...updatedData } : coin
    );
    this.setCoins(collectionName, updatedCoins);
    const params = this.createHttpParams({ collectionName, symbol });
    const options = { ...this.httpOptions, params };

    this.http
      .put<ModifyResult>(`${COINS_URLS.coinsUpdateOneUrl}`, options)
      .subscribe({
        next: (response: ModifyResult) => {
          const msg = `Documents modified ${response.modifiedCount}`;
          this.snackbarService.showSnackBar(msg, '');
        },
        error: (error) => this.handleError(error),
      });
  }

  public moveMany(
    sourceCollection: string,
    targetCollection: string,
    coins: Coin[]
  ): void {
    const sourceCoins = this.getCoins(sourceCollection);
    const destinationCoins = this.getCoins(targetCollection);
    const symbols = coins.map((c) => c.symbol);
    // Filter and separate coins to move
    const coinsToMove = sourceCoins.filter((coin) =>
      symbols.includes(coin.symbol)
    );
    const remainingSourceCoins = sourceCoins.filter(
      (coin) => !symbols.includes(coin.symbol)
    );

    // Update source and destination collections
    this.setCoins(sourceCollection, remainingSourceCoins);
    this.setCoins(targetCollection, [...destinationCoins, ...coinsToMove]);

    // HTTP request to add a coin with query parameters
    const params = this.createHttpParams({
      sourceCollection,
      targetCollection,
    });
    const options = { ...this.httpOptions, params };

    this.http
      .post<MoveResult>(`${COINS_URLS.coinsMoveManyUrl}`, coins, options)
      .subscribe({
        next: (response: MoveResult) => {
          const msg = `Documents inserted: ${response.insertCount}, deleted: ${response.deleteCount}`;
          this.snackbarService.showSnackBar(msg, '');
        },
        error: this.handleError,
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
