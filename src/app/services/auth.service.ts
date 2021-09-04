import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snack-bar.service';
import Swal from 'sweetalert2';

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
      this.router.navigate(['operations']);
    } else {
      this.error();
    }
  }

  get isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }

  error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El email o password son incorrectos!',
      confirmButtonText: `Aceptar`,
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }
}
