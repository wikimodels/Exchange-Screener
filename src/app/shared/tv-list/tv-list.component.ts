import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.css'],
})
export class TvListComponent {
  constructor(
    public dialogRef: MatDialogRef<TvListComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { bybitList: string; binanceList: string }
  ) {}

  downloadCodeAsTxt(exchange: string) {
    let dataToDownload = '';
    let fileName = '';

    // Select data and filename based on the exchange
    switch (exchange) {
      case 'Bybit':
        dataToDownload = this.data.bybitList;
        fileName = 'BYBIT-LIST.txt';
        break;
      case 'Binance':
        dataToDownload = this.data.binanceList;
        fileName = 'BINANCE-LIST.txt';
        break;
      default:
        console.warn('Unknown exchange:', exchange);
        return;
    }

    // Check if data is empty
    if (!dataToDownload) {
      console.warn('No data to download for', exchange);
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
