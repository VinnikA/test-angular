import { Component, OnInit } from '@angular/core';
import { Currency } from './models/currency';
import { CurrencyService } from './services/currency.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  data: Currency[] = [];
  currencyData: Currency[] = [];
  loading: boolean = false;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.loading = true;
    this.currencyService.getRate().subscribe(res => {
      this.data = res;
      this.loading = false;
      this.currencyData = this.data.filter(item => !/X\w\w/.test(item.cc));
    })
  }

}
