import {
  Component,
  Input,
  OnInit,
  ElementRef,
  AfterViewInit,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
@Component({
  selector: 'app-santiment-chart',
  templateUrl: './santiment-chart.component.html',
  styleUrls: ['./santiment-chart.component.css'],
})
export class SantimentChartComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @Input() chartOptions!: EChartsOption | null;
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  echartInstance: echarts.ECharts | null = null;

  ngOnInit(): void {
    // No need to initialize the chart instance here; this will be done in ngAfterViewInit
  }

  ngAfterViewInit(): void {
    // Wait for chartContainer to be available before initializing ECharts
    setTimeout(() => {
      if (this.chartContainer) {
        this.echartInstance = echarts.init(this.chartContainer.nativeElement);

        // Apply the chart options
        if (this.chartOptions) {
          this.echartInstance.setOption(this.chartOptions);
        }
      }
    }, 0); // Deferring the initialization to the next tick
  }

  ngAfterViewChecked(): void {
    // Optional: Additional checks for view updates if needed
    if (!this.echartInstance && this.chartContainer) {
      this.echartInstance = echarts.init(this.chartContainer.nativeElement);
      if (this.chartOptions) {
        this.echartInstance.setOption(this.chartOptions);
      }
    }
  }
  onChartInit(echarts: any) {
    let self = this;
    this.echartInstance = echarts;
    this.echartInstance?.on('click', function (event: any) {
      // Print name in console
      console.log('Event Name', event.name);
      console.log('Event Value', event.value);
      console.log('Event Value', event.color.colorStops[0].color);
      const pieData: any = { name: event.name, value: event.value };
      //   //self.onPieSliceSelect.emit(pieData);
    });
  }
}
