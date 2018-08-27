import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_guards';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { AdminhomeComponent } from  './components/adminhome/adminhome.component';
import { AddPlansComponent } from './components/add-plans/add-plans.component';
import { AssignPlanComponent } from  './components/assign-plan/assign-plan.component';
import { CheckuserbalanceComponent } from  './components/checkuserbalance/checkuserbalance.component';
import { SetcapitalassetComponent } from './components/setcapitalasset/setcapitalasset.component';
import { SetliquidassetComponent } from './components/setliquidasset/setliquidasset.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { LiveNavComponent } from './components/live-nav/live-nav.component';
import { AddmanualstockComponent } from './components/addmanualstock/addmanualstock.component';


const routes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full', canActivate: [AuthGuard] , data: { allowUnAuthAccess: false } },
  { path: 'dashboard',   component: DashboardComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'verifyu',   component: VerifyUserComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'home',   component: AdminhomeComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'addplan',   component: AddPlansComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'assignplan',   component: AssignPlanComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'checkuserbal',   component: CheckuserbalanceComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'capitalasset',   component: SetcapitalassetComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'liquidasset',   component: SetliquidassetComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'addstock',   component: AddStockComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'livenav',   component: LiveNavComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'manualstock',   component: AddmanualstockComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
