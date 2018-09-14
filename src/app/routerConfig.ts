// routerConfig.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { InquiryComponent } from './components/inquiry/inquiry.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { AuthGuard } from './_guards';

export const appRoutes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'fpassword', component: ForgotpasswordComponent },
  { path: 'inquiry', component: InquiryComponent },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuard],
    data: { allowUnAuthAccess: false }
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    canActivate: [AuthGuard],
    data: { allowUnAuthAccess: false }
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
