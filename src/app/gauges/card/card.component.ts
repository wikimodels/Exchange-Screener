import {
  Component,
  OnChanges,
  Input,
  EventEmitter,
  Output,
  AfterViewInit,
} from '@angular/core';
//import { CanvasJS } from '@canvasjs/angular-charts';
import * as CanvasJS from 'canvasjs';
import { NgxGaugeType } from 'ngx-gauge/gauge/gauge';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() chartOptions: any;
  @Input() obs: any;

  chart: any;

  ngOnInit() {}
  ngAfterViewInit() {
    this.obs.subscribe(() => {
      this.chart.render();
      console.log('Hello, Doooy!');
    });
  }
  ngOnChanges(change: any) {
    console.log('change', change);
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min); // Round up minimum value
    max = Math.floor(max); // Round down maximum value
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  someMethod() {
    this.chart.render();
  }

  getChartInstance(chart: object) {
    this.chart = chart;
  }
}
