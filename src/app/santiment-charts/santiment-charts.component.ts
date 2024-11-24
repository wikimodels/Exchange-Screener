import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coin } from 'models/coin/coin';
import { CoinsCollections } from 'models/coin/coins-collections';
import { Subscription } from 'rxjs';
import { CoinsGenericService } from 'src/service/coins/coins-generic.service';
import { SantimentGenericService } from 'src/service/santiment/santiment-generic.service';

@Component({
  selector: 'app-santiment-charts',
  templateUrl: './santiment-charts.component.html',
  styleUrls: ['./santiment-charts.component.css'],
})
export class SantimentChartsComponent implements OnDestroy {
  logoUrl = 'assets/img/noname.png';
  symbol = '';
  slug!: string | null;
  subSantiment!: Subscription | null;
  subCoins!: Subscription | null;
  santimentChartsData: any[] = [];
  fromDate = new Date().toISOString().split('.')[0];
  toDate = new Date(new Date().setMonth(new Date().getMonth() - 6))
    .toISOString()
    .split('.')[0];

  constructor(
    private route: ActivatedRoute,
    private santimentService: SantimentGenericService,
    private coinsService: CoinsGenericService
  ) {
    // Subscribe to query parameters
    this.route.queryParams.subscribe((params) => {
      this.symbol = params['symbol']; // Get 'symbol' query param
      this.logoUrl = params['image_url'] ? params['image_url'] : this.logoUrl;
    });

    this.subCoins = this.coinsService.coins$.subscribe((coins: Coin[]) => {
      const coin = coins.find((c) => c.symbol == this.symbol);
      if (coin) {
        this.logoUrl = coin.image_url ? coin.image_url : this.logoUrl;
      }
    });

    this.subSantiment = this.santimentService
      .santiment$(this.symbol)
      .subscribe((data) => {
        if (data.length === 0) {
          this.santimentService.getHttpSantiment(this.symbol);
        }
        this.santimentChartsData = data;
        console.log(this.santimentChartsData);
      });
  }

  ngOnDestroy(): void {
    if (this.subSantiment) {
      this.subSantiment.unsubscribe();
    }
    if (this.subCoins) {
      this.subCoins.unsubscribe();
    }
  }
}
