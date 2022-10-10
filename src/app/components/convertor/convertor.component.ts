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

  ngOnChanges() {
    this.currency = this.data.map(item => item.cc);
    this.currency.unshift('UAH');
  }

  private getValue = (value: number, firstState: string, secondState: string) => {
    if(firstState === secondState) {
      return value;
    } 
    const firstRate = this.data.find(item => item.cc === firstState)?.rate || 1;
    const secondRate = this.data.find(item => item.cc === secondState)?.rate || 1;
    return Math.round(value*firstRate/secondRate*100)/100;
  }

   firstChange = () => {
    this.secondInput = this.getValue(this.firstInput, this.firstSelect, this.secondSelect);
  }

  secondChange = () => {
    this.firstInput = this.getValue(this.secondInput, this.secondSelect, this.firstSelect);
  }

}
