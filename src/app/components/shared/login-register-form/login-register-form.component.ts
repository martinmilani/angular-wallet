import { Component, Input, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-login-register-form',
  templateUrl: './login-register-form.component.html',
  styleUrls: ['./login-register-form.component.scss'],
})
export class LoginRegisterFormComponent implements OnInit {
  @Input() title: string = '';

  form: FormGroup;

  //Toggle Validator for Name field
  formNameValidator: ValidatorFn = (c) => {
    return this.title == 'register'
      ? Validators.required(c)
      : Validators.nullValidator(c);
  };

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public usersService: UsersService
  ) {
    this.form = this.formBuilder.group({
      name: ['', this.formNameValidator],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  login() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.auth(email, password);
    this.form.reset();
  }

  register() {
    const name = this.form.value.name;
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.usersService.addUser(name, email, password);
    this.form.reset();
  }
}
