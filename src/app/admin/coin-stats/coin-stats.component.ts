import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CoinStatistics,
  ExchangeStatistics,
} from 'models/coin/coin-statistics';
import { Subscription } from 'rxjs';
import { CoinsStatisticsService } from 'src/service/admin/coins-stats.service';

@Component({
  selector: 'app-coin-stats',
  templateUrl: './coin-stats.component.html',
  styleUrls: ['./coin-stats.component.css'],
})
export class CoinStatsComponent implements OnInit, OnDestroy {
  statistics: CoinStatistics | null = null;
  categories: string[] = [];
  sub!: Subscription;
  constructor(private coinsStats: CoinsStatisticsService) {}
  ngOnInit(): void {
    this.coinsStats.fetchStatistics().subscribe();
    this.sub = this.coinsStats.coinStatistics$.subscribe((data) => {
      this.statistics = data;
      this.categories = data
        ? Object.keys(data)
            .filter((key) => key !== 'total')
            .sort((a, b) => this.romanToInt(a) - this.romanToInt(b))
        : [];
    });
  }

  // Helper function to convert Roman numerals to integers
  romanToInt(roman: string): number {
    const romanMap: { [key: string]: number } = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };
    let num = 0;
    for (let i = 0; i < roman.length; i++) {
      const current = romanMap[roman[i]];
      const next = romanMap[roman[i + 1]];
      if (next && current < next) {
        num -= current;
      } else {
        num += current;
      }
    }
    return num;
  }
  reloadStatistics(): void {
    this.coinsStats.fetchStatistics().subscribe();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
