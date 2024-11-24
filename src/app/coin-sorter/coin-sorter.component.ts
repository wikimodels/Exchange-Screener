import { Component } from '@angular/core';
import { CoinsCollections } from 'models/coin/coins-collections';
import { TablesCssClasses } from 'models/shared/table-css-classes';

@Component({
  selector: 'app-coin',
  templateUrl: './coin-sorter.component.html',
  styleUrls: ['./coin-sorter.component.css'],
})
export class CoinSorterComponent {
  collectionName = CoinsCollections.CoinSorter;
  tableCssClass = TablesCssClasses.CoinSorter;
  tableHeader = 'Coin Sorter';
  showButtons = {
    coinSorter: false,
    coinProvider: true,
    coinRepo: true,
    coinBlackList: true,
    coinTvList: true,
  };
}
