import { Component, OnInit } from '@angular/core';
import { DropDownList } from '../../models/currency.model';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { SnackBarService } from '../../services/snack-bar.service';
import { Operation } from '../../models/operation.model';
import { OperationsService } from '../../services/operations.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
})
export class OperationsComponent implements OnInit {
  form: FormGroup;
  currentUser: User;

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
    private formBuilder: FormBuilder,
    public snackBarService: SnackBarService,
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
      category: ['', [Validators.required, Validators.maxLength(20)]],
      date: ['', Validators.required],
      currency: ['ARS', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  handleSave(form: any, formDirective: FormGroupDirective): void {
    /*  console.log(this.form.value); */
    let id = this.operationsService.getLastOperationsId();
    let operation: Operation = {
      id: id,
      userId: this.currentUser.id,
      amount: this.form.value.amount,
      category: this.form.value.category,
      date: this.form.value.date,
      currency: this.form.value.currency,
      type: this.form.value.type,
    };

    this.operationsService.addOperation(operation);

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
