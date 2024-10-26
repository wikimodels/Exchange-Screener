import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Coin } from 'models/shared/coin';
import { Subscription } from 'rxjs';
import { CoinsService } from 'src/service/coins.service';

@Component({
  selector: 'app-work-field',
  templateUrl: './work-field.component.html',
  styleUrls: ['./work-field.component.css'],
})
export class WorkFieldComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  coins!: Coin[];
  selection = new SelectionModel<any>(true, []);
  constructor(private coinsService: CoinsService) {}
  ngOnInit(): void {
    this.sub = this.coinsService.workingCoins$.subscribe((data: Coin[]) => {
      this.coins = data;
      console.log(this.coins);
    });
  }

  onDeleteAllWorkingCoins() {
    this.coinsService.deleteAllWorkingCoins().subscribe();
  }
  isAllSelected() {
    return true;
  }
  toggleAll() {}
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
