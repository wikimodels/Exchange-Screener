import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  ALERTS_AT_WORK,
  ARCHIVED_ALERTS,
  TRIGGERED_ALERTS,
} from 'src/consts/url-consts';

@Component({
  selector: 'app-alert-menu',
  templateUrl: './alert-menu.component.html',
  styleUrls: ['./alert-menu.component.css'],
})
export class AlertMenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToAlertsAtWork() {
    this.router.navigate([ALERTS_AT_WORK]);
  }

  goToTriggeredAlerts() {
    this.router.navigate([TRIGGERED_ALERTS]);
  }

  goToArchivedAlerts() {
    this.router.navigate([ARCHIVED_ALERTS]);
  }
}
