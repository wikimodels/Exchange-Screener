import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { Observable, Subject, interval, timer } from 'rxjs';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
const chartOptions = {
  title: {
    text: 'Top Oil Reserves',
  },
  indexLabelPlacement: 'inside',
  innerRadius: '60%',
  animationEnabled: true,
  data: [
    {
      type: 'doughnut', //change type to column, line, area, doughnut, etc
      dataPoints: [
        { x: 1, y: 2, label: 'Venezuela' },
        { x: 2, y: 5, label: 'Saudi' },
        { x: 3, y: 5, label: 'Canada' },
        { x: 4, y: 5, label: 'Iran' },
        { x: 5, y: 3, label: 'Russia' },
        { x: 6, y: 4, label: 'UAE' },
        { x: 7, y: 5, label: 'US' },
        { x: 8, y: 7, label: 'China' },
      ],
    },
  ],
};
const signal$: Observable<any> = interval(7000);
@Component({
  selector: 'app-gauges',
  templateUrl: './gauges.component.html',
  styleUrls: ['./gauges.component.css'],
})
export class GaugesComponent {
  signal$: Observable<any> = interval(7000);
  charts: any[];
  obs: any[];
  constructor() {
    this.obs = [signal$, signal$, signal$];
    this.charts = [chartOptions, chartOptions, chartOptions];
  }
  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }
  ngAfterViewInit() {
    this.signal$.subscribe(() => {
      this.charts?.forEach((cur) => {
        cur.data[0].dataPoints[0].y = this.getRandomInt(10, 20);
      });

      console.log('Shit Updated');
    });
  }

  updateCharts() {
    this.charts?.forEach((cur) => {
      cur.data[0].dataPoints[0].y = this.getRandomInt(10, 20);
    });
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min); // Round up minimum value
    max = Math.floor(max); // Round down maximum value
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
