import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PanelChart } from 'models/panel-charts.model';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PanelService {
  private showVwap15mSubj = new BehaviorSubject<any>(null);
  showVwap15mdata$: Observable<any> = this.showVwap15mSubj.asObservable();
  private _showChartSubj = new BehaviorSubject<PanelChart>({
    displayName: '',
    codeName: '',
    isHidden: false,
  });
  showChartSubj$ = this._showChartSubj.asObservable();

  setShowChartSubj(value: PanelChart): void {
    this._showChartSubj.next(value);
  }

  getShowChartSubj(): PanelChart {
    return this._showChartSubj.getValue();
  }
}
