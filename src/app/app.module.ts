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
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertsTableComponent } from './alerts/alerts-table/alerts-table.component';
import { ImageModalComponent } from './alerts/image-modal/image-modal.component';
import { NewAlertComponent } from './alerts/new-alert/new-alert.component';
import { TriggeredAlertsComponent } from './triggered-alerts/triggered-alerts.component';
import { TriggeredAlertsTableComponent } from './triggered-alerts/triggered-alerts-table/triggered-alerts-table.component';

import { DescriptionModalComponent } from './shared/description-modal/description-modal.component';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { MenuComponent } from './nav-bar/menu/menu.component';
import { ArchivedAlertsComponent } from './archived-alerts/archived-alerts.component';
import { ValidationSummaryComponent } from './shared/validation-summary/validation-summary.component';

import { ArchivedTableComponent } from './archived-alerts/archived-table/archived-table.component';
import { WorkComponent } from './work/work.component';
import { WorkFieldComponent } from './work/work-field/work-field.component';
import { WorkItemComponent } from './work/work-item/work-item.component';
import { EditAlertComponent } from './alerts/edit-alert/edit-alert.component';

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
    SpinnerComponent,
    AlertsComponent,
    AlertsTableComponent,
    ImageModalComponent,
    NewAlertComponent,
    TriggeredAlertsComponent,
    TriggeredAlertsTableComponent,
    DescriptionModalComponent,
    SnackbarComponent,
    CarouselComponent,
    MenuComponent,
    ArchivedAlertsComponent,
    ValidationSummaryComponent,
    EditAlertComponent,
    ArchivedTableComponent,
    WorkComponent,
    WorkFieldComponent,
    WorkItemComponent,
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
