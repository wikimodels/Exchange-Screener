import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'alarm',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/alarm.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'triggered-alarm',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/triggered-alarm.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'bybit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/bybit.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'tw',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/tw.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'binance',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/binance-black.svg'
      )
    );
  }
}
