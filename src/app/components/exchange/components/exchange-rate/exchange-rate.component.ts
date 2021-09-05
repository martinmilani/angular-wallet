import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../../../services/exchange.service';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss'],
})
export class ExchangeRateComponent implements OnInit {
  prices: any;

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit(): void {
    this.exchangeService
      .getPrices()
      .subscribe((prices) => (this.prices = prices));
  }
}
