import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewAlertComponent } from '../alerts/new-alert/new-alert.component';
import {
  ADMIN,
  COIN,
  COIN_BLACK_LIST,
  COIN_PROVIDER,
  WORK,
  WS,
} from 'src/consts/url-consts';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private modelDialog: MatDialog) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  onGetToWork() {
    this.router.navigate([WORK]);
  }

  onGoToCoin() {
    this.router.navigate([COIN]);
  }

  onGoToWs() {
    this.router.navigate([WS]);
  }

  onGoToCoinProvider() {
    this.router.navigate([COIN_PROVIDER]);
  }

  onGoToCoinBlackList() {
    this.router.navigate([COIN_BLACK_LIST]);
  }

  onGoToAdminPanel() {
    this.router.navigate([ADMIN]);
  }

  onAddAlert() {
    this.modelDialog.open(NewAlertComponent, {
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '100vw',
      height: '100vh',
    });
  }
}
