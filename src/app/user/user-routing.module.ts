import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_guards/';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdatedocumentComponent } from './components/updatedocument/updatedocument.component';
import { UserhomeComponent } from './components/userhome/userhome.component';


const routes: Routes = [
  { path: '', redirectTo: '/user/dashboard', pathMatch: 'full' },
  { path: 'dashboard',   component: DashboardComponent, canActivate:[AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'updatedoc',   component: UpdatedocumentComponent, canActivate:[AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'home',   component: UserhomeComponent, canActivate:[AuthGuard] , data: { allowUnAuthAccess: false }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
