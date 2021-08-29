import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snack-bar.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: User[] = [];
  user: any = {};

  constructor(
    public usersService: UsersService,
    private router: Router,
    public snackBarService: SnackBarService
  ) {}

  ngOnInit() {}

  auth(email: string, password: string) {
    const users: User[] = this.usersService.getUsers();
    let findUser = users.find(
      (u) => u.email == email && u.password == password
    );
    if (findUser) {
      localStorage.setItem('currentUser', JSON.stringify(findUser));
      this.router.navigate(['dashboard']);
      console.log(findUser);
    } else {
      this.error();
    }
  }

  get isLoggedIn(): Observable<boolean> {
    if (localStorage.getItem('currentUser')) {
      return of(true);
    } else {
      return of(false);
    }
  }

  error() {
    this.snackBarService.openSnackBar(
      'Invalid email or password!',
      'red-snackbar'
    );
  }
}
