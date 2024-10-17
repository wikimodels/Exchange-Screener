import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root',
})
export class KeyLevelNamesService {
  constructor(private alertsService: AlertsService) {}

  checkKeyLevelNameExists(keyLevelName: string): Observable<boolean> {
    const res = this.alertsService.Alerts.some(
      (a) => a.keyLevelName == keyLevelName
    );
    return of(res);
  }
}
