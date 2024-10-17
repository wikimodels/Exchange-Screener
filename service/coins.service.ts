import { env } from 'environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, retry, of, tap } from 'rxjs';
import { Coin } from 'models/shared/coin';

@Injectable({ providedIn: 'root' })
export class CoinsService {
  private coins: Coin[] = [];
  get Coins() {
    return this.coins;
  }
  constructor(private http: HttpClient) {}
  getAllCoins(): Observable<any> {
    return this.http.get(env.coinsUrl).pipe(
      tap((data: any) => {
        this.coins = data;
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
}
