import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  ALERTS_AT_WORK,
  ARCHIVED_ALERTS,
  COIN,
  COIN_BLACK_LIST,
  COIN_PROVIDER,
  COIN_SORTER,
  TRIGGERED_ALERTS,
} from 'src/consts/url-consts';

@Component({
  selector: 'app-coin-menu',
  templateUrl: './coin-menu.component.html',
  styleUrls: ['./coin-menu.component.css'],
})
export class CoinMenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onGoToCoin() {
    this.router.navigate([COIN]);
  }

  onGoToCoinProvider() {
    this.router.navigate([COIN_PROVIDER]);
  }

  onGoToCoinSorter() {
    this.router.navigate([COIN_SORTER]);
  }

  onGoToCoinBlackList() {
    this.router.navigate([COIN_BLACK_LIST]);
  }
}
