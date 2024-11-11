import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coin } from 'models/coin/coin';
import { CoinsCollections } from 'models/coin/coins-collections';
import { Subscription } from 'rxjs';
import { CoinsGenericService } from 'src/service/coins/coins-generic.service';
import { SantimentGenericService } from 'src/service/santiment/santiment-generic.service';

@Component({
  selector: 'app-santiment',
  templateUrl: './santiment.component.html',
  styleUrls: ['./santiment.component.css'],
})
export class SantimentComponent implements OnDestroy {
  logoUrl = 'assets/img/noname.png';
  symbol!: string | null;
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
    this.symbol = this.route.snapshot.paramMap.get('symbol') || '';
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.logoUrl =
      this.route.snapshot.paramMap.get('image_url') || this.logoUrl;

    this.subCoins = this.coinsService
      .coins$(CoinsCollections.CoinRepo)
      .subscribe((coins: Coin[]) => {
        console.log('COINS', coins);
        const coin = coins.find((c) => c.symbol == this.symbol);
        if (coin) {
          this.logoUrl = coin.image_url ? coin.image_url : this.logoUrl;
        }
      });

    this.subSantiment = this.santimentService
      .santiment$(this.symbol)
      .subscribe((data) => {
        if (data.length === 0) {
          this.santimentService.getHttpSantiment(
            this.symbol || '',
            this.slug || '',
            this.fromDate,
            this.toDate
          );
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
