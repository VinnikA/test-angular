import { Component, Input } from '@angular/core';
import { Currency } from 'src/app/models/currency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() data: Currency[];
  @Input() loading: boolean;

}
