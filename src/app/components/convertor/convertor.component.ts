import { Component, Input, OnChanges } from '@angular/core';
import { Currency } from 'src/app/models/currency';

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.scss']
})
export class ConvertorComponent implements OnChanges{

  firstSelect = 'USD';
  secondSelect = 'UAH';
  
  firstInput = 0;
  secondInput = 0;
  @Input() loading: boolean;
  @Input() data: Currency[];
  currency: string[];

  private newValue = (value: number, fK?: string, sK?: string) => {
    if(fK && !sK) {
      return Math.round(value*Number(fK)*100)/100;
    }
    if(!fK && sK) {
      return Math.round(value/Number(sK)*100)/100;
    }
    if(fK && sK) {
      return Math.round(value*Number(fK)/Number(sK)*100)/100;
    }
    return value;
  }

  ngOnChanges() {
    this.currency = this.data.map(item => item.ccy);
    this.currency.push('UAH');
  }

   firstChange = () => {
    if(this.firstSelect === this.secondSelect) {
      this.secondInput = this.firstInput
    } else{
      const firstCurr = this.data.find(item => item.ccy === this.firstSelect);
      const secondCurr = this.data.find(item => item.ccy === this.secondSelect);
      if(firstCurr && !secondCurr) {
        this.secondInput = this.newValue(this.firstInput, firstCurr.buy)
      }
      if(!firstCurr && secondCurr) {
        this.secondInput = this.newValue(this.firstInput, '', secondCurr?.sale);
      }
      if(firstCurr && secondCurr) {
        this.secondInput = this.newValue(this.firstInput, firstCurr?.buy, secondCurr?.buy);
      }
    }
  }

  secondChange = () => {
    if(this.firstSelect === this.secondSelect) {
      this.firstInput = this.secondInput
    } else{
      const firstCurr = this.data.find(item => item.ccy === this.firstSelect);
      const secondCurr = this.data.find(item => item.ccy === this.secondSelect);
      if(firstCurr && !secondCurr) {
        this.firstInput = this.newValue(this.secondInput, '', firstCurr?.buy);
      }
      if(!firstCurr && secondCurr) {
        this.firstInput = this.newValue(this.secondInput, secondCurr?.sale);
      }
      if(firstCurr && secondCurr) {
        this.firstInput = this.newValue(this.secondInput, secondCurr?.buy, firstCurr?.buy);
      }
    }
  }

}
