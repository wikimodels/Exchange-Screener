import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxEchartsModule } from 'ngx-echarts';

import { CanvasRenderer } from 'echarts/renderers';
import Marcaron from './marcaron';

import * as echarts from 'echarts/core';
import { BarChart, CandlestickChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  LegendComponent,
} from 'echarts/components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { GaugesComponent } from './gauges/gauges.component';
import { CardComponent } from './gauges/card/card.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TestComponent } from './test/test.component';

import { ChartComponent } from './gauges/chart/chart.component';

echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  BarChart,
  CandlestickChart,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
]);
echarts.registerTheme('macarons', Marcaron);

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CardComponent,
    GaugesComponent,
    TestComponent,
    ChartComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({ echarts }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    NgxGaugeModule,
    CanvasJSAngularChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
