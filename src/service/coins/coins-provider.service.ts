import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { SnackbarService } from '../snackbar.service';
import { COINS_URLS } from 'src/consts/url-consts';
import { SnackbarType } from 'models/shared/snackbar-type';

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

  runRefreshmentProcedure(): Observable<any> {
    return this.http
      .get<any>(COINS_URLS.coinsRunRefreshmentUrl, this.httpOptions)
      .pipe(
        tap((data: { finish: boolean }) => {
          const msg = 'Procedure finished';
          this.snackbarService.showSnackBar(
            msg,
            '',
            4000,
            SnackbarType.Warning
          );
        }),
        catchError((error) => this.handleError(error))
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
