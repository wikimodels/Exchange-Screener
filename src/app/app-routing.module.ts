import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsComponent } from './alerts/alerts.component';
import {
  ALERTS_AT_WORK,
  ARCHIVED_ALERTS,
  COIN,
  COIN_BLACK_LIST,
  COIN_PROVIDER,
  COIN_SORTER,
  SANTIMENT,
  TRIGGERED_ALERTS,
  WORK,
} from 'src/consts/url-consts';
import { TriggeredAlertsComponent } from './triggered-alerts/triggered-alerts.component';
import { ArchivedAlertsComponent } from './archived-alerts/archived-alerts.component';
import { WorkComponent } from './work/work.component';
import { CoinComponent } from './coin/coin.component';
import { CoinProviderComponent } from './coin-provider/coin-provider.component';
import { CoinBlackListComponent } from './coin-black-list/coin-black-list.component';
import { CoinSorterComponent } from './coin-sorter/coin-sorter.component';
import { SantimentComponent } from './santiment/santiment.component';

const routes: Routes = [
  // Other routes for your application
  //{ path: 'about', component: AboutComponent }, // Example route
  { path: SANTIMENT + '/:symbol/:slug', component: SantimentComponent },
  { path: ALERTS_AT_WORK, component: AlertsComponent },
  { path: TRIGGERED_ALERTS, component: TriggeredAlertsComponent },
  { path: COIN_BLACK_LIST, component: CoinBlackListComponent },
  { path: COIN_PROVIDER, component: CoinProviderComponent },
  { path: COIN_SORTER, component: CoinSorterComponent },
  { path: ARCHIVED_ALERTS, component: ArchivedAlertsComponent },
  { path: WORK, component: WorkComponent },
  { path: COIN, component: CoinComponent },
  { path: '**', redirectTo: '' }, // Wildcard route for unmatched paths (optional)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
