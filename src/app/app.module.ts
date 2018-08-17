import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { appRoutes } from './routerConfig';
import { AlertComponent, } from './_directives';
import { EqualValidator } from './_directives/EqualValidator.directive';
import { AuthGuard } from './_guards';
import { JwtInterceptorProvider, ErrorInterceptorProvider } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    EqualValidator,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    ForgotpasswordComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule,NgbModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }