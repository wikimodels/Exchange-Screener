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
  ToolboxComponent,
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
import { ArchivedAlertsComponent } from './archived-alerts/archived-alerts.component';
import { ValidationSummaryComponent } from './shared/validation-summary/validation-summary.component';

import { ArchivedTableComponent } from './archived-alerts/archived-table/archived-table.component';
import { WorkComponent } from './work/work.component';
import { WorkFieldComponent } from './work/work-field/work-field.component';
import { WorkItemComponent } from './work/work-item/work-item.component';

import { DeleteItemComponent } from './shared/delete-item/delete-item.component';
import { CoinProviderComponent } from './coin-provider/coin-provider.component';
import { CoinBlackListComponent } from './coin-black-list/coin-black-list.component';
import { AlertMenuComponent } from './nav-bar/alert-menu/alert-menu.component';
import { CoinMenuComponent } from './nav-bar/coin-menu/coin-menu.component';

import { CoinSorterComponent } from './coin-sorter/coin-sorter.component';
import { TvListComponent } from './shared/tv-list/tv-list.component';
import { EditCoinComponent } from './shared/edit-coin/edit-coin.component';
import { EditAlertComponent } from './shared/edit-alert/edit-alert.component';

import { WsComponent } from './admin/ws/ws.component';
import { CoinDescriptionComponent } from './shared/coin-description/coin-description.component';
import { AdminComponent } from './admin/admin.component';
import { SantimentChartsComponent } from './santiment-charts/santiment-charts.component';
import { SantimentChartComponent } from './santiment-charts/santiment-chart/santiment-chart.component';
import { SantimentComponent } from './admin/santiment/santiment.component';
import { CoinStatsComponent } from './admin/coin-stats/coin-stats.component';
import { CoinRepoComponent } from './coin-repo/coin-repo.component';
import { CoinTableComponent } from './shared/coin-table/coin-table.component';
import { NewInclinedAlertComponent } from './alerts/new-inclined-alert/new-inclined-alert.component';
import { EditInclinedAlertComponent } from './shared/edit-inclined-alert/edit-inclined-alert.component';

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
  ToolboxComponent,
]);
echarts.registerTheme('macarons', Marcaron);

@NgModule({
  declarations: [
    TriggeredAlertsTableComponent,
    ValidationSummaryComponent,
    DescriptionModalComponent,
    TriggeredAlertsComponent,
    SantimentChartsComponent,
    CoinDescriptionComponent,
    SantimentChartComponent,
    ArchivedAlertsComponent,
    CoinBlackListComponent,
    ArchivedTableComponent,
    CoinProviderComponent,
    AlertsTableComponent,
    DeleteItemComponent,
    CoinSorterComponent,
    ImageModalComponent,
    AlertMenuComponent,
    SantimentComponent,
    EditAlertComponent,
    WorkFieldComponent,
    CoinTableComponent,
    CoinStatsComponent,
    SnackbarComponent,
    WorkItemComponent,
    CarouselComponent,
    CoinMenuComponent,
    EditCoinComponent,
    NewAlertComponent,
    CoinRepoComponent,
    SpinnerComponent,
    AlertsComponent,
    TvListComponent,
    NavBarComponent,
    AdminComponent,
    WorkComponent,
    AppComponent,
    WsComponent,
    NewInclinedAlertComponent,
    EditInclinedAlertComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgxGaugeModule,
    HttpClientModule,
    AppRoutingModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CanvasJSAngularChartsModule,
    NgxEchartsModule.forRoot({ echarts }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
