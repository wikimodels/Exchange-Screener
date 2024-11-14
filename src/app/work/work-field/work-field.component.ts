import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Coin } from 'models/coin/coin';
import { CoinsCollections } from 'models/coin/coins-collections';
import { Subscription } from 'rxjs';
import { CoinsGenericService } from 'src/service/coins/coins-generic.service';

@Component({
  selector: 'app-work-field',
  templateUrl: './work-field.component.html',
  styleUrls: ['./work-field.component.css'],
})
export class WorkFieldComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  coins!: Coin[];
  selection = new SelectionModel<any>(true, []);
  constructor(private coinsService: CoinsGenericService) {}
  ngOnInit(): void {
    this.coinsService.getAllCoins(CoinsCollections.CoinAtWork);
    this.sub = this.coinsService
      .coins$(CoinsCollections.CoinAtWork)
      .subscribe((data: Coin[]) => {
        this.coins = data;
      });
  }

  isAllSelected() {
    return true;
  }

  toggleAll() {}

  onDrop(event: CdkDragDrop<any[]>): void {
    //moveItemInArray(this.coins, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
