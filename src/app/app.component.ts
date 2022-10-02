import { Component, OnInit } from '@angular/core';
import { Currency } from './models/currency';
import { CurrencyService } from './services/currency.service';
import { Rates } from './models/currency';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  data: Currency[] = [];
  loading: boolean = false;
  rates: Rates = {
    usdSale: '0',
    usdBuy: '0',
    eurSale: '0',
    eurBuy: '0'
  }

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.loading = true;
    this.currencyService.getRate().subscribe(res => {
      this.data = res;
      this.rates = {
        usdSale: this.data.find(item => item.ccy === 'USD')?.sale || '0',
        usdBuy: this.data.find(item => item.ccy === 'USD')?.buy || '0',
        eurSale: this.data.find(item => item.ccy === 'EUR')?.sale || '0',
        eurBuy: this.data.find(item => item.ccy === 'EUR')?.buy || '0'
      }
      this.loading = false;
    })
  }

}
