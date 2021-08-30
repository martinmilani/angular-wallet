import { Component } from '@angular/core';
import { User } from './models/user.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-wallet';

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

  constructor(private authService: AuthService) {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.initialLocalStorage));
    }
  }
}
