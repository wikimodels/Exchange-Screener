import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.css'],
})
export class TvListComponent {
  // Assuming coinLists is passed in the data
  coinLists: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<TvListComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { coinLists: string[] } // Adapted to expect a coinLists array
  ) {
    this.coinLists = data.coinLists;
  }

  // Method to determine the exchange name based on the index
  getExchangeName(index: number): string {
    const exchangeNames = ['Bybit', 'Binance', 'BingX SF', 'BingX PF'];
    return exchangeNames[index] || 'Unknown Exchange';
  }

  // Method to determine the logo URL based on the index
  getExchangeLogo(index: number): string {
    const logos: {
      [key in 'Bybit' | 'Binance' | 'BingX SF' | 'BingX PF']: string;
    } = {
      Bybit: 'assets/icons/bybit.svg',
      Binance: 'assets/icons/binance-black.svg',
      'BingX SF': 'assets/icons/bingx-sf.svg',
      'BingX PF': 'assets/icons/bingx-pf.svg',
    };

    // Get the exchange name based on the index
    const exchangeName = this.getExchangeName(index);

    // Safely access logos with the exchange name
    return (
      logos[exchangeName as 'Bybit' | 'Binance' | 'BingX SF' | 'BingX PF'] ||
      'assets/icons/default-logo.svg'
    );
  }

  // Method to download the coin list as a text file
  downloadCodeAsTxt(listIndex: number) {
    const dataToDownload = this.coinLists[listIndex];
    let fileName = '';

    // Determine the file name based on the list index
    switch (listIndex) {
      case 0:
        fileName = 'BYBIT-LIST.txt';
        break;
      case 1:
        fileName = 'BINANCE-LIST.txt';
        break;
      case 2:
        fileName = 'BINGX-SF-LIST.txt';
        break;
      case 3:
        fileName = 'BINGX-PF-LIST.txt';
        break;
      default:
        console.warn('Unknown list index:', listIndex);
        return;
    }

    // Check if the data is empty
    if (!dataToDownload) {
      console.warn('No data to download for list', listIndex);
      return; // Exit if there's no data
    }

    // Create and download the blob file
    const blob = new Blob([dataToDownload], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
