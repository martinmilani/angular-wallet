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

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentUser: any;
  form: FormGroup;

  constructor(
    public usersService: UsersService,
    private formBuilder: FormBuilder,
    private operationsService: OperationsService
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
    this.currentUser = this.usersService.currentUser;
  }

  handleTransfer(form: any, formDirective: FormGroupDirective, id: number) {
    let operationOut: Operation = {
      userId: this.currentUser.id,
      amount: this.form.value.amount,
      category: 'Transferencia',
      date: this.form.value.date,
      currency: this.form.value.currency,
      type: this.form.value.type,
      account: 'pesos',
    };

    console.log('Transferir a: ', id, '$ ', this.form.value.amount);
    formDirective.resetForm();
    this.form.reset();
    alert('Esta a punto de transferir');
  }
}
