/* import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export interface UsersState {
  users: User[];
}

@Injectable()
export class UsersStore extends ComponentStore<UsersState> {
  constructor() {
    super({
      users: [
        {
          id: 1,
          name: 'User 1',
          email: 'user1@mail.com',
          password: '12345',
        },
        {
          id: 2,
          name: 'User 2',
          email: 'user2@mail.com',
          password: '12345',
        },
      ],
    });
  }

  users$: Observable<User[]> = this.select((state) => state.users);
}
 */
