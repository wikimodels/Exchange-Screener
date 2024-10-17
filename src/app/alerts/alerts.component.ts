import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/services/alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription | null = null;
  constructor(private alertService: AlertsService) {}

  ngOnInit(): void {
    this.dataSubscription = this.alertService
      .getAllAlerts()
      .subscribe((data) => {
        console.log(data);
      });
  }
  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
