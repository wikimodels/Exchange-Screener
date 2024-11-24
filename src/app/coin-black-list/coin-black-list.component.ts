import { Component } from '@angular/core';
import { CoinsCollections } from 'models/coin/coins-collections';
import { TablesCssClasses } from 'models/shared/table-css-classes';

@Component({
  selector: 'app-coin-black-list',
  templateUrl: './coin-black-list.component.html',
  styleUrls: ['./coin-black-list.component.css'],
})
export class CoinBlackListComponent {
  collectionName = CoinsCollections.CoinBlackList;
  tableCssClass = TablesCssClasses.CoinBlackList;
  tableHeader = 'Coin Black List';
  showButtons = {
    coinSorter: true,
    coinProvider: true,
    coinRepo: true,
    coinBlackList: false,
    coinTvList: false,
  };
}
