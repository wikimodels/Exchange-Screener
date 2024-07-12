import { Component } from '@angular/core';
import { Chart, ChartOptions } from 'canvasjs';
import { EChartsOption } from 'echarts';
import { PanelChart } from 'models/panel-charts.model';

import { MajorService } from 'service/major.service';
import { PanelService } from 'service/panel.service';

@Component({
  selector: 'app-coll-vwap15m',
  templateUrl: './coll-vwap15m.component.html',
  styleUrls: ['./coll-vwap15m.component.css'],
})
export class CollVwap15mComponent {
  echartOptions: any;
  echartInstance: any;
  isHidden = true;
  notLoaded = true;
  codeName = 'vwap15m';

  constructor(
    private majorSercie: MajorService,
    private panelService: PanelService
  ) {
    this.panelService.showChartSubj$.subscribe((data: PanelChart) => {
      if (data.codeName == this.codeName) {
        this.isHidden = data.isHidden;
      }
    });
    this.majorSercie.getCollVwap15m().subscribe(
      (data: ChartOptions) => {
        this.echartOptions = data;
        this.isHidden = !this.isHidden;
        this.notLoaded = false;
      },
      (error) => console.log(error)
    );
  }
  onChartInit(echart: Chart) {
    this.echartInstance = echart;
  }
}
