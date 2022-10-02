import { Component, Input } from '@angular/core';
import { Rates } from 'src/app/models/currency';

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.scss']
})
export class ConvertorComponent {

  firstSelect = 'USD';
  secondSelect = 'UAH';
  firstInput = 0;
  secondInput = 0;
  @Input() rates: Rates;
  @Input() loading: boolean;

   firstChange = () => {
    const newValue = (k: number) => Math.round(this.firstInput*k*100)/100;
    if(this.firstSelect === 'USD' && this.secondSelect === 'UAH') {
      this.secondInput = newValue(Number(this.rates.usdBuy));
    }
    if(this.firstSelect === 'EUR' && this.secondSelect === 'UAH') {
      this.secondInput = newValue(Number(this.rates.eurBuy));
    }
    if(this.firstSelect === 'UAH' && this.secondSelect === 'USD') {
      this.secondInput = newValue(1/Number(this.rates.usdSale));
    }
    if(this.firstSelect === 'UAH' && this.secondSelect === 'EUR') {
      this.secondInput = newValue(1/Number(this.rates.eurSale));
    }
    if(this.firstSelect === 'USD' && this.secondSelect === 'EUR') {
      this.secondInput = newValue(Number(this.rates.usdBuy)/Number(this.rates.eurBuy));
    }
    if(this.firstSelect === 'EUR' && this.secondSelect === 'USD') {
      this.secondInput = newValue(Number(this.rates.eurBuy)/Number(this.rates.usdBuy));
    }
    if(this.firstSelect === this.secondSelect) {
      this.secondInput = this.firstInput;
    }
  }

  secondChange = () => {
    const newValue = (k: number) => Math.round(this.secondInput*k*100)/100;
    if(this.firstSelect === 'USD' && this.secondSelect === 'UAH') {
      this.firstInput  = newValue(1/Number(this.rates.usdBuy));
    }
    if(this.firstSelect === 'EUR' && this.secondSelect === 'UAH') {
      this.firstInput  = newValue(1/Number(this.rates.eurBuy));
    }
    if(this.firstSelect === 'UAH' && this.secondSelect === 'USD') {
      this.firstInput  = newValue(Number(this.rates.usdSale));
    }
    if(this.firstSelect === 'UAH' && this.secondSelect === 'EUR') {
      this.firstInput  = newValue(Number(this.rates.eurSale));
    }
    if(this.firstSelect === 'USD' && this.secondSelect === 'EUR') {
      this.firstInput  = newValue(Number(this.rates.eurBuy)/Number(this.rates.usdBuy));
    }
    if(this.firstSelect === 'EUR' && this.secondSelect === 'USD') {
      this.firstInput  = newValue(Number(this.rates.usdBuy)/Number(this.rates.eurBuy));
    }
    if(this.firstSelect === this.secondSelect) {
      this.firstInput = this.secondInput;
    }
  }

}
