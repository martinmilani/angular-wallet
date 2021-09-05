import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { SnackBarService } from '../services/snack-bar.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: User[] = [];
  currentUser: any = {};
  selectedUser: any = {};
  user: any = {};

  initialLocalStorage: User[] = [
    {
      id: 1,
      name: 'User 1',
      email: 'user1@mail.com',
      password: '12345',
      image: 'https://avatars.dicebear.com/api/human/user1.svg',
    },
    {
      id: 2,
      name: 'User 2',
      email: 'user2@mail.com',
      password: '12345',
      image: 'https://avatars.dicebear.com/api/human/user2.svg',
    },
  ];

  constructor(private router: Router, public snackBarService: SnackBarService) {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.initialLocalStorage));
    }
    this.users = JSON.parse(localStorage.getItem('users') || '');
    /*  */
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
  }

  getUsers() {
    this.users = JSON.parse(localStorage.getItem('users') || '');
    return this.users;
  }

  getUserById(id: number) {
    const users: User[] = this.getUsers();
    this.selectedUser = users.find((u) => u.id == id);
    return this.selectedUser;
  }

  getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.currentUser;
  }

  findUserByEmail(email: string) {
    /*    console.log(this.users.find((u) => u.email === email)); */
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
    Swal.fire({
      icon: 'success',
      text: 'Se ha registrado un nuevo usuario!',
      confirmButtonText: `Aceptar`,
    });
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
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El email ya ha sido registrado!',
      confirmButtonText: `Aceptar`,
    });
  }
}
