import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../../services/operations.service';
import { OperationsComponent } from '../operations/operations.component';
import { UsersService } from '../../services/users.service';

@Component({
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  totalIncomeARS: number = 0;
  totalExpenseARS: number = 0;
  totalARS: number = 0;
  totalIncomeUSD: number = 0;
  totalExpenseUSD: number = 0;
  totalUSD: number = 0;

  constructor(
    private operationServices: OperationsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    let userId = this.usersService.getCurrentUser().id;
    this.totalIncomeARS = this.operationServices.getTotals(
      userId,
      'ARS',
      'INCOME'
    );
    this.totalExpenseARS = this.operationServices.getTotals(
      userId,
      'ARS',
      'EXPENSE'
    );
    this.totalARS = this.totalIncomeARS - this.totalExpenseARS;
    this.totalIncomeUSD = this.operationServices.getTotals(
      userId,
      'USD',
      'INCOME'
    );
    this.totalExpenseUSD = this.operationServices.getTotals(
      userId,
      'USD',
      'EXPENSE'
    );
    this.totalUSD = this.totalIncomeUSD - this.totalExpenseUSD;
  }
}
