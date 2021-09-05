import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticatedLayoutComponent } from './components/shared/authenticated-layout/authenticated-layout.component';
import { AnonymousLayoutComponent } from './components/shared/anonymous-layout/anonymous-layout.component';
import { OperationsComponent } from './components/operations/operations.component';
import { MovementsComponent } from './components/movements/movements.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'operations', component: OperationsComponent },
      { path: 'movements', component: MovementsComponent },
      { path: '**', redirectTo: '/operations', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: AnonymousLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
