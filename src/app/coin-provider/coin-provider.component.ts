import { Component } from '@angular/core';
import { CoinsCollections } from 'models/coin/coins-collections';
import { TablesCssClasses } from 'models/shared/table-css-classes';

@Component({
  selector: 'app-coin-provider',
  templateUrl: './coin-provider.component.html',
  styleUrls: ['./coin-provider.component.css'],
})
export class CoinProviderComponent {
  collectionName = CoinsCollections.CoinProvider;
  tableCssClass = TablesCssClasses.CoinProvider;
  tableHeader = 'Coin Provider';
  showButtons = {
    coinSorter: true,
    coinProvider: false,
    coinRepo: true,
    coinBlackList: true,
  };
}
