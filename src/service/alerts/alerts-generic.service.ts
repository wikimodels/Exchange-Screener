import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { SnackbarService } from '../snackbar.service';
import {
  DeleteResult,
  InsertResult,
  ModifyResult,
  MoveResult,
} from 'models/mongodb/operations';
import { SnackbarType } from 'models/shared/snackbar-type';
import { Alert } from 'models/alerts/alert';
import { ALERTS_URLS } from 'src/consts/url-consts';

@Injectable({ providedIn: 'root' })
export class AlertsGenericService {
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

  private AlertCollections: Map<string, BehaviorSubject<Alert[]>> = new Map();

  private getOrCreateCollection(
    collectionName: string
  ): BehaviorSubject<Alert[]> {
    if (!this.AlertCollections.has(collectionName)) {
      this.AlertCollections.set(
        collectionName,
        new BehaviorSubject<Alert[]>([])
      );
    }
    return this.AlertCollections.get(collectionName)!;
  }

  public alerts$(collectionName: string): Observable<Alert[]> {
    return this.getOrCreateCollection(collectionName).asObservable();
  }

  public setAlerts(collectionName: string, Alerts: Alert[]): void {
    const AlertCollection = this.getOrCreateCollection(collectionName);
    AlertCollection.next(Alerts);
  }

  public getAlerts(collectionName: string): Alert[] {
    return this.getOrCreateCollection(collectionName).value;
  }

  public getAllAlerts(collectionName: string): void {
    const params = this.createHttpParams({ collectionName });
    const options = { ...this.httpOptions, params };

    this.http.get<Alert[]>(ALERTS_URLS.alertsUrl, options).subscribe({
      next: (Alerts: Alert[]) => {
        this.setAlerts(collectionName, Alerts);
      },
      error: (error) => this.handleError(error),
    });
  }

  public addOne(collectionName: string, Alert: Alert): void {
    const currentAlerts = this.getAlerts(collectionName);
    this.setAlerts(collectionName, [...currentAlerts, Alert]);

    // HTTP request to add a Alert with query parameters
    const params = this.createHttpParams({ collectionName });
    const options = { ...this.httpOptions, params };

    this.http
      .post<InsertResult>(`${ALERTS_URLS.alertsAddOneUrl}`, Alert, options)
      .subscribe({
        next: (response: InsertResult) => {
          const msg = `Document inserted ${response.insertedCount}`;
          this.snackbarService.showSnackBar(msg, '');
        },
        error: (error) => this.handleError(error),
      });
  }

  public deleteMany(collectionName: string, ids: string[]): void {
    const currentAlerts = this.getAlerts(collectionName);
    const remainingAlerts = currentAlerts.filter(
      (alert) => !ids.includes(alert.id)
    );
    this.setAlerts(collectionName, remainingAlerts);
    const params = this.createHttpParams({ collectionName });

    const options = {
      ...this.httpOptions,
      params: params,
      body: { ids },
    };

    this.http
      .delete<DeleteResult>(`${ALERTS_URLS.alertsDeleteManyUrl}`, options)
      .subscribe({
        next: (response: DeleteResult) => {
          const msg = `Documents deleted ${response.deletedCount}`;
          this.snackbarService.showSnackBar(msg, '');
        },
        error: (error) => this.handleError(error),
      });
  }

  public updateOne(collectionName: string, updatedData: Alert): void {
    const currentAlerts = this.getAlerts(collectionName);
    const updatedAlerts = currentAlerts.map((alert) =>
      alert.id === updatedData.id ? { ...alert, ...updatedData } : alert
    );
    this.setAlerts(collectionName, updatedAlerts);

    const params = this.createHttpParams({ collectionName });
    const options = { ...this.httpOptions, params };

    this.http
      .post<ModifyResult>(
        `${ALERTS_URLS.alertsUpdateOneUrl}`,
        updatedData,
        options
      )
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
    alerts: Alert[]
  ): void {
    const sourceAlerts = this.getAlerts(sourceCollection);
    const destinationAlerts = this.getAlerts(targetCollection);
    const symbols = alerts.map((c) => c.symbol);
    // Filter and separate Alerts to move
    const alertsToMove = sourceAlerts.filter((alert) =>
      symbols.includes(alert.symbol)
    );
    const remainingSourceAlerts = sourceAlerts.filter(
      (alert) => !symbols.includes(alert.symbol)
    );

    // Update source and destination collections
    this.setAlerts(sourceCollection, remainingSourceAlerts);
    this.setAlerts(targetCollection, [...destinationAlerts, ...alertsToMove]);

    // HTTP request to add a Alert with query parameters
    const params = this.createHttpParams({
      sourceCollection,
      targetCollection,
    });
    const options = { ...this.httpOptions, params };

    this.http
      .post<MoveResult>(`${ALERTS_URLS.alertsMoveManyUrl}`, alerts, options)
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
