import { Component, ViewChild } from '@angular/core';
import { PanelChart } from 'models/panel-charts.model';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent {
  vwap15m: PanelChart = {
    displayName: 'VWAP 15m',
    codeName: 'vwap15m',
    isHidden: false,
  };
  vwap1h: PanelChart = {
    displayName: 'VWAP 1h',
    codeName: 'vwap1h',
    isHidden: false,
  };
  vwap4h: PanelChart = {
    displayName: 'VWAP 4h',
    codeName: 'vwap4h',
    isHidden: false,
  };
}
