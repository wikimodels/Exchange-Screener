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
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { HttpClientModule } from '@angular/common/http';
import { MajorComponent } from './major/major.component';
import { CollVwap15mComponent } from './major/coll-vwap15m/coll-vwap15m.component';
import { CollVwap1hComponent } from './major/coll-vwap1h/coll-vwap1h.component';
import { CollVwap4hComponent } from './major/coll-vwap4h/coll-vwap4h.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PanelComponent } from './major/panel/panel.component';
import { CheckboxComponent } from './major/checkbox/checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MajorComponent,
    CollVwap15mComponent,
    CollVwap1hComponent,
    CollVwap4hComponent,
    SpinnerComponent,
    PanelComponent,
    CheckboxComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({ echarts }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    NgxGaugeModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
