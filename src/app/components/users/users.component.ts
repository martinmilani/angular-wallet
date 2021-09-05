import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { OperationsService } from '../../services/operations.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { Operation } from '../../models/operation.model';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentUser: any;
  form: FormGroup;

  ARS = {
    prefix: 'ARS $: ',
    thousands: '.',
    decimal: ',',
    precision: 2,
  };

  constructor(
    public dialog: MatDialog,
    public usersService: UsersService,
    private formBuilder: FormBuilder,
    private operationsService: OperationsService,
    private currencyPipe: CurrencyPipe
  ) {
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
    });
  }

  ngOnInit(): void {
    this.users = this.usersService.getUsers();
    this.currentUser = this.usersService.getCurrentUser();
  }

  handleTransfer(
    form: any,
    formDirective: FormGroupDirective,
    userId: number,
    userName: string
  ) {
    const formatedCurrency = this.currencyPipe.transform(
      this.form.value.amount,
      'ARS'
    );
    let operationsId = this.operationsService.getLastOperationsId();
    const expenseOperation: Operation = {
      id: operationsId,
      userId: this.currentUser.id,
      amount: this.form.value.amount,
      category: 'Transferencia',
      date: this.operationsService.currentDate,
      currency: 'ARS',
      type: 'EXPENSE',
    };

    const incomeOperation: Operation = {
      id: operationsId + 1,
      userId: userId,
      amount: this.form.value.amount,
      category: 'Transferencia',
      date: this.operationsService.currentDate,
      currency: 'ARS',
      type: 'INCOME',
    };

    Swal.fire({
      title: 'Confirme la Transferencia',
      text: `Estas a punto de transferir a ${userName} la cantidad de ARS ${formatedCurrency}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Transferir',
    }).then((result) => {
      if (result.isConfirmed) {
        this.operationsService.addTransfer(expenseOperation, incomeOperation);
      }
    });

    formDirective.resetForm();
    this.form.reset();
  }
}
