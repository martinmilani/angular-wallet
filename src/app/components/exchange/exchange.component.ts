import { Component, OnInit } from '@angular/core';
import { DropDownList } from '../../models/currency.model';

import {
  Form,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

import { Operation } from '../../models/operation.model';
import { User } from '../../models/user.model';

import { OperationsService } from '../../services/operations.service';
import { UsersService } from '../../services/users.service';
import { ExchangeService } from '../../services/exchange.service';

@Component({
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {
  form: FormGroup;
  currentUser: User;

  prices: any;

  ARS = {
    prefix: 'ARS $: ',
    thousands: '.',
    decimal: ',',
    precision: 2,
  };

  USD = {
    prefix: 'USD $: ',
    thousands: ',',
    decimal: '.',
    precision: 2,
  };

  CurrencyList: DropDownList[] = [
    { code: 'ARS', text: 'Argentina Pesos – ARS' },
    { code: 'USD', text: 'United States Dollars – USD' },
  ];

  constructor(
    private exchangeService: ExchangeService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private operationsService: OperationsService
  ) {
    this.currentUser = this.usersService.getCurrentUser();
    this.form = this.formBuilder.group({
      amount: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(
            '^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$'
          ),
        ],
      ],
      currency: ['ARS', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.exchangeService
      .getPrices()
      .subscribe((prices) => (this.prices = prices));
  }

  getAmounts() {
    let dolarCompra = parseFloat(this.prices[0].casa.compra.replace(',', '.'));
    let dolarVenta = parseFloat(this.prices[0].casa.venta.replace(',', '.'));
    console.log('compra: ', dolarCompra, typeof dolarCompra);
    console.log('venta: ', dolarVenta, typeof dolarVenta);
    let amounts = { ars: 0, usd: 0 };
    let operationType = this.form.value.type;
    let operationCurrency = this.form.value.currency;
    let operationAmount = this.form.value.amount;
    if (operationCurrency == 'ARS') {
      amounts.ars = operationAmount;
      amounts.usd =
        operationAmount /
        (operationType == 'EXPENSE' ? dolarVenta : dolarCompra);
    } else {
      amounts.ars =
        operationAmount *
        (operationType == 'EXPENSE' ? dolarVenta : dolarCompra);

      amounts.usd = operationAmount;
    }
    return amounts;
    /* console.log(amounts); */
  }

  getTypes() {
    const accountType = { ars: '', usd: '' };
    if (this.form.value.type === 'EXPENSE') {
      accountType.ars = 'EXPENSE';
      accountType.usd = 'INCOME';
    } else {
      accountType.ars = 'INCOME';
      accountType.usd = 'EXPENSE';
    }

    return accountType;
  }

  handleSave(form: any, formDirective: FormGroupDirective): void {
    /*  console.log(this.form.value); */
    const amounts = this.getAmounts();
    const accountTypes = this.getTypes();
    const operationsId = this.operationsService.getLastOperationsId();

    const arsOperation: Operation = {
      id: operationsId,
      userId: this.currentUser.id,
      amount: Math.round(amounts.ars * 100) / 100,
      category: 'Compra de Divisas',
      date: this.operationsService.currentDate,
      currency: 'ARS',
      type: accountTypes.ars,
    };

    const usdOperation: Operation = {
      id: operationsId + 1,
      userId: this.currentUser.id,
      amount: Math.round(amounts.usd * 100) / 100,
      category: 'Compra de Divisas',
      date: this.operationsService.currentDate,
      currency: 'USD',
      type: accountTypes.usd,
    };

    /* this.operationsService.addTransfer(arsOperation, usdOperation); */
    console.log(arsOperation, usdOperation);

    formDirective.resetForm();
    this.form.reset();
  }

  getCurrency() {
    if (this.form.value.currency == 'ARS') {
      return this.ARS;
    } else {
      return this.USD;
    }
  }
}
