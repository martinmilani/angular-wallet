import { Component } from '@angular/core';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-wallet';

  initialLocalStorage: User[] = [
    {
      id: 'user1@mail.com12345',
      name: 'User 1',
      email: 'user1@mail.com',
      password: '12345',
      image: 'https://avatars.dicebear.com/api/human/user1.svg',
    },
    {
      id: 'user2@mail.com12345',
      name: 'User 2',
      email: 'user2@mail.com',
      password: '12345',
      image: 'https://avatars.dicebear.com/api/human/user2.svg',
    },
  ];

  constructor() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.initialLocalStorage));
    }
  }
}
