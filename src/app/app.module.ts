import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modules
import { SharedModule } from './components/shared/shared.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CurrencyPipe } from '@angular/common';

//Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginRegisterFormComponent } from './components/shared/login-register-form/login-register-form.component';
import { AnonymousLayoutComponent } from './components/shared/anonymous-layout/anonymous-layout.component';
import { AuthenticatedLayoutComponent } from './components/shared/authenticated-layout/authenticated-layout.component';
import { OperationsComponent } from './components/operations/operations.component';
import { TransferDialogComponent } from './components/users/components/transfer-dialog/transfer-dialog.component';
import { MovementsComponent } from './components/movements/movements.component';

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
    LoginComponent,
    RegisterComponent,
    LoginComponent,
    LoginRegisterFormComponent,
    AnonymousLayoutComponent,
    AuthenticatedLayoutComponent,
    OperationsComponent,
    TransferDialogComponent,
    MovementsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, CurrencyMaskModule],
  providers: [
    UsersService,
    SnackBarService,
    AuthService,
    AuthGuard,
    CurrencyPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
