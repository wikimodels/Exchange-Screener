import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MajorComponent } from './major/major.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ALERTS, TRIGGERED_ALERTS } from 'src/consts/url-consts';
import { TriggeredAlertsComponent } from './triggered-alerts/triggered-alerts.component';

const routes: Routes = [
  { path: '', component: MajorComponent }, // Default route
  // Other routes for your application
  //{ path: 'about', component: AboutComponent }, // Example route
  { path: ALERTS, component: AlertsComponent },
  { path: TRIGGERED_ALERTS, component: TriggeredAlertsComponent },
  { path: '**', redirectTo: '' }, // Wildcard route for unmatched paths (optional)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
