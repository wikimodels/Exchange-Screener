import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsComponent } from './alerts/alerts.component';
import {
  SANTIMENT_CHARTS,
  TRIGGERED_ALERTS,
  ARCHIVED_ALERTS,
  COIN_BLACK_LIST,
  ALERTS_AT_WORK,
  COIN_PROVIDER,
  COIN_SORTER,
  COIN_REPO,
  ADMIN,
  WORK,
  WS,
} from 'src/consts/url-consts';
import { TriggeredAlertsComponent } from './triggered-alerts/triggered-alerts.component';
import { ArchivedAlertsComponent } from './archived-alerts/archived-alerts.component';
import { WorkComponent } from './work/work.component';

import { CoinProviderComponent } from './coin-provider/coin-provider.component';
import { CoinBlackListComponent } from './coin-black-list/coin-black-list.component';
import { CoinSorterComponent } from './coin-sorter/coin-sorter.component';
import { WsComponent } from './admin/ws/ws.component';
import { AdminComponent } from './admin/admin.component';
import { SantimentChartsComponent } from './santiment-charts/santiment-charts.component';
import { CoinRepoComponent } from './coin-repo/coin-repo.component';

const routes: Routes = [
  // Other routes for your application
  //{ path: 'about', component: AboutComponent }, // Example route
  {
    path: SANTIMENT_CHARTS,
    component: SantimentChartsComponent,
  },
  { path: ADMIN, component: AdminComponent },
  { path: ALERTS_AT_WORK, component: AlertsComponent },
  { path: WS, component: WsComponent },
  { path: TRIGGERED_ALERTS, component: TriggeredAlertsComponent },
  { path: COIN_BLACK_LIST, component: CoinBlackListComponent },
  { path: COIN_PROVIDER, component: CoinProviderComponent },
  { path: COIN_SORTER, component: CoinSorterComponent },
  { path: ARCHIVED_ALERTS, component: ArchivedAlertsComponent },
  { path: WORK, component: WorkComponent },
  { path: COIN_REPO, component: CoinRepoComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
