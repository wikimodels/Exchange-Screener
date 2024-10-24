import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  ALERTS_AT_WORK,
  ARCHIVED_ALERTS,
  TRIGGERED_ALERTS,
} from 'src/consts/url-consts';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigation occurred:', event.url);
      }
    });
  }

  goToAlertsAtWork() {
    //TODO
    console.log('Shit is click');
    this.router.navigate([ALERTS_AT_WORK]);
  }

  goToTriggeredAlerts() {
    this.router.navigate([TRIGGERED_ALERTS]);
  }

  goToArchivedAlerts() {
    this.router.navigate([ARCHIVED_ALERTS]);
  }
}
