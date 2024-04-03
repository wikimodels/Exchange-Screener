import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CanvasJS } from '@canvasjs/angular-charts';

var chartOptions = {
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

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {
  chart: CanvasJS.ChartOptions | any;
  chartOptions: any; //CanvasJS.ChartOptions | undefined;
  constructor() {
    this.chartOptions = chartOptions;
  }
  ngAfterViewInit() {
    setInterval(() => {
      this.chartOptions.data[0].dataPoints[0].y = this.getRandomInt(10, 20);
      this.chartOptions.data[0].dataPoints[1].y = this.getRandomInt(10, 20);
      this.chartOptions.data[0].dataPoints[2].y = this.getRandomInt(10, 20);
      this.chart.render();
    }, 5000);
  }
  getChartInstance(chart: any) {
    this.chart = chart;
  }
  getRandomInt(min: number, max: number) {
    min = Math.ceil(min); // Round up minimum value
    max = Math.floor(max); // Round down maximum value
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
