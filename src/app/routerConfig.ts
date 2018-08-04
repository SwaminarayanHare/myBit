// routerConfig.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';


export const appRoutes: Routes = [
  { path: 'home', 
    component: HomeComponent 
  },
  { path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: 'dashboard',
    component: DashboardComponent
  },

  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];