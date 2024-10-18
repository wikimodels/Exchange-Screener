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
import { SpinnerComponent } from './spinner/spinner.component';
import { PanelComponent } from './major/panel/panel.component';
import { CheckboxComponent } from './major/checkbox/checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertsTableComponent } from './alerts/alerts-table/alerts-table.component';
import { ImageModalComponent } from './alerts/image-modal/image-modal.component';
import { NewAlertComponent } from './alerts/new-alert/new-alert.component';
import { TriggeredAlertsComponent } from './triggered-alerts/triggered-alerts.component';
import { TriggeredAlertsTableComponent } from './triggered-alerts/triggered-alerts-table/triggered-alerts-table.component';
import { ScreenModalComponent } from './triggered-alerts/screen-modal/screen-modal.component';
import { DescriptionModalComponent } from './triggered-alerts/description-modal/description-modal.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

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
    SpinnerComponent,
    PanelComponent,
    CheckboxComponent,
    AlertsComponent,
    AlertsTableComponent,
    ImageModalComponent,
    NewAlertComponent,
    TriggeredAlertsComponent,
    TriggeredAlertsTableComponent,
    ScreenModalComponent,
    DescriptionModalComponent,
    SnackbarComponent,
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
