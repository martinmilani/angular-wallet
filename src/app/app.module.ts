import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modules
import { SharedModule } from './components/shared/shared.module';

//Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginRegisterFormComponent } from './components/shared/login-register-form/login-register-form.component';

//Services
import { UsersService } from './services/users.service';
import { SnackBarService } from './services/snack-bar.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    LoginComponent,
    LoginRegisterFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [UsersService, SnackBarService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
