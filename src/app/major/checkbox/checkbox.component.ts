import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PanelChart } from 'models/panel-charts.model';

import { PanelService } from 'src/services/panel.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent implements AfterViewInit {
  @Input() chart: PanelChart = {
    displayName: '',
    codeName: '',
    isHidden: false,
  };
  checked = true;
  showChart = new FormControl(this.checked);
  constructor(private panelService: PanelService) {}
  ngAfterViewInit() {
    this.showChart.valueChanges.subscribe((value) => {
      const obj: PanelChart = {
        displayName: this.chart.displayName,
        codeName: this.chart.codeName,
        isHidden: !(value as boolean),
      };
      console.log(obj);
      this.panelService.setShowChartSubj(obj);
    });
  }
}
