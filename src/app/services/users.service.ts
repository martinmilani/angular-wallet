import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { SnackBarService } from '../services/snack-bar.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: User[] = [];
  currentUser: any = {};
  user: any = {};

  constructor(private router: Router, public snackBarService: SnackBarService) {
    /* this.users = JSON.parse(localStorage.getItem('users') || ''); */
  }

  getUsers() {
    this.users = JSON.parse(localStorage.getItem('users') || '');
    return this.users;
  }

  getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.currentUser;
  }

  findUserByEmail(email: string) {
    console.log(this.users.find((u) => u.email === email));
    if (this.users.find((u) => u.email === email)) {
      return true;
    } else {
      return false;
    }
  }

  storeUserOnLocalStorage(name: string, email: string, password: string) {
    let users: User[] = [];
    let id = JSON.parse(localStorage.getItem('users') || '').length + 1;

    this.user.id = id;
    this.user.name = name;
    this.user.email = email;
    this.user.password = password;
    this.user.image = `https://avatars.dicebear.com/api/human/${name}${id}.svg`;

    users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(this.user);
    localStorage.setItem('users', JSON.stringify(users));
    this.snackBarService.openSnackBar(
      'Usuario creado exitosamente',
      'green-snackbar'
    );
    this.router.navigate(['']);
  }

  addUser(name: string, email: string, password: string) {
    if (this.findUserByEmail(email)) {
      this.error();
    } else {
      this.storeUserOnLocalStorage(name, email, password);
    }
  }

  error() {
    this.snackBarService.openSnackBar(
      'El email ya ha sido registrado',
      'red-snackbar'
    );
  }
}
