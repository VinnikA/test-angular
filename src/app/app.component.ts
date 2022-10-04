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
  uahBaseData: Currency[] = [];
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
      // this.uahBaseData = this.data.map(item => {
      //   if(item.base_ccy === 'UAH') {
      //     return item;
      //   } else {
      //     const base: Currency | undefined = this.data.find(el => el.ccy === item.base_ccy);
      //     if(base) {
      //       const newBuy = (Number(item.buy) * Number(base.buy)).toString();
      //       const newSale = (Number(item.sale) * Number(base.sale)).toString();
      //       return {...item, buy: newBuy, sale: newSale}
      //     }
      //   }
      // })
      this.uahBaseData = this.data.filter(item => item.base_ccy === 'UAH');
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
