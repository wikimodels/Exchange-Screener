import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CoinLinksService {
  coinglassLink(symbol: string, exchanges: string[]): string {
    console.log('symbol', symbol);
    console.log('exchanges', exchanges);
    // Check if "Binance" is in exchanges
    if (exchanges.includes('Binance')) {
      return `https://www.coinglass.com/tv/Binance_${symbol}`;
    }

    // Check if "Bybit" is in exchanges and "Binance" is not
    if (exchanges.includes('Bybit') && !exchanges.includes('Binance')) {
      return `https://www.coinglass.com/tv/Bybit_${symbol}`;
    }

    // Check if "BingX SF" or "BingX PF" is in exchanges and neither "Binance" nor "Bybit" is present
    if (
      (exchanges.includes('BingX SF') || exchanges.includes('BingX PF')) &&
      !exchanges.includes('Binance') &&
      !exchanges.includes('Bybit')
    ) {
      return `https://www.coinglass.com/tv/BingX_${
        symbol.split('USDT')[0]
      }-USDT`;
    }

    // Default case (if none of the conditions match)
    return '';
  }

  tradingViewLink(symbol: string, exchanges: string[]): string {
    console.log('symbol', symbol);
    console.log('exchanges', exchanges);
    // Check if "Bybit" is in exchanges
    if (exchanges.includes('Bybit')) {
      return `https://www.tradingview.com/chart?symbol=BYBIT:${symbol}.P`;
    }

    // Check if "Binance" is in exchanges and "Bybit" is not
    if (exchanges.includes('Binance') && !exchanges.includes('Bybit')) {
      return `https://www.tradingview.com/chart?symbol=BINANCE:${symbol}.P`;
    }

    // Check if "BingX SF" is in exchanges and neither "Binance" nor "Bybit" is present
    if (
      exchanges.includes('BingX SF') &&
      !exchanges.includes('Binance') &&
      !exchanges.includes('Bybit')
    ) {
      return `https://www.tradingview.com/chart?symbol=BINGX:${symbol}.PS`;
    }

    // Check if "BingX PF" is in exchanges and neither "Binance" nor "Bybit" is present
    if (
      exchanges.includes('BingX PF') &&
      !exchanges.includes('Binance') &&
      !exchanges.includes('Bybit')
    ) {
      return `https://www.tradingview.com/chart?symbol=BINGX:${symbol}.P`;
    }

    // Default case (if none of the conditions match)
    return '';
  }

  exchangeLink(symbol: string, exchange: string) {
    if (exchange == 'Binance') {
      return `https://www.binance.com/en/futures/${symbol}`;
    }
    if (exchange == 'Bybit') {
      return `https://www.bybit.com/trade/usdt/${symbol}`;
    }
    if (exchange == 'BingX SF') {
      return `https://www.tradingview.com/chart?symbol=BINGX:${symbol}.PS`;
    }
    if (exchange == 'BingX PF') {
      return `https://bingx.com/ru-ru/perpetual/${symbol.replace(
        'USDT',
        ''
      )}-USDT`;
    }
    return '';
  }

  exchangeLogoLink(exchange: string) {
    if (exchange == 'Binance') {
      return `assets/icons/binance-black.svg`;
    }
    if (exchange == 'Bybit') {
      return `assets/icons/bybit.svg`;
    }
    if (exchange == 'BingX SF') {
      return `assets/icons/bingx-sf.svg`;
    }
    if (exchange == 'BingX PF') {
      return `assets/icons/bingx-pf.svg`;
    }
    return '';
  }
}
