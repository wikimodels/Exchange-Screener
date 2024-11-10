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
import { ArchivedAlertsComponent } from './archived-alerts/archived-alerts.component';
import { ValidationSummaryComponent } from './shared/validation-summary/validation-summary.component';

import { ArchivedTableComponent } from './archived-alerts/archived-table/archived-table.component';
import { WorkComponent } from './work/work.component';
import { WorkFieldComponent } from './work/work-field/work-field.component';
import { WorkItemComponent } from './work/work-item/work-item.component';

import { CoinComponent } from './coin/coin.component';
import { DeleteItemComponent } from './shared/delete-item/delete-item.component';
import { CoinProviderComponent } from './coin-provider/coin-provider.component';
import { CoinProviderTableComponent } from './coin-provider/coin-provider-table/coin-provider-table.component';
import { CoinBlackListComponent } from './coin-black-list/coin-black-list.component';
import { CoinBlackListTableComponent } from './coin-black-list/coin-black-list-table/coin-black-list-table.component';
import { AlertMenuComponent } from './nav-bar/alert-menu/alert-menu.component';
import { CoinMenuComponent } from './nav-bar/coin-menu/coin-menu.component';
import { CoinTableComponent } from './coin/coin-table/coin-table.component';
import { CoinSorterComponent } from './coin-sorter/coin-sorter.component';
import { CoinSorterTableComponent } from './coin-sorter/coin-sorter-table/coin-sorter-table.component';
import { TvListComponent } from './shared/tv-list/tv-list.component';
import { EditCoinComponent } from './shared/edit-coin/edit-coin.component';
import { EditAlertComponent } from './shared/edit-alert/edit-alert.component';
import { SantimentComponent } from './santiment/santiment.component';
import { SantimentChartComponent } from './santiment/santiment-chart/santiment-chart.component';

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
    TriggeredAlertsTableComponent,
    CoinBlackListTableComponent,
    ValidationSummaryComponent,
    CoinProviderTableComponent,
    DescriptionModalComponent,
    CoinSorterTableComponent,
    TriggeredAlertsComponent,
    ArchivedAlertsComponent,
    CoinBlackListComponent,
    ArchivedTableComponent,
    CoinProviderComponent,
    AlertsTableComponent,
    DeleteItemComponent,
    CoinSorterComponent,
    ImageModalComponent,
    AlertMenuComponent,
    EditAlertComponent,
    WorkFieldComponent,
    CoinTableComponent,
    SnackbarComponent,
    WorkItemComponent,
    CarouselComponent,
    CoinMenuComponent,
    EditCoinComponent,
    NewAlertComponent,
    SpinnerComponent,
    AlertsComponent,
    TvListComponent,
    NavBarComponent,
    WorkComponent,
    CoinComponent,
    AppComponent,
    SantimentComponent,
    SantimentChartComponent,
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
