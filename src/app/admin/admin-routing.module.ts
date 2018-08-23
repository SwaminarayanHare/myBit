import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_guards/';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { AdminhomeComponent } from  './components/adminhome/adminhome.component';
import { AddPlansComponent } from './components/add-plans/add-plans.component';
import { AssignPlanComponent } from  './components/assign-plan/assign-plan.component';
import { CheckuserbalanceComponent } from  './components/checkuserbalance/checkuserbalance.component';
import { PricingComponent } from './components/pricing/pricing.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full', canActivate: [AuthGuard] , data: { allowUnAuthAccess: false } },
  { path: 'dashboard',   component: DashboardComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'verifyu',   component: VerifyUserComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'home',   component: AdminhomeComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'addplan',   component: AddPlansComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'assignplan',   component: AssignPlanComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'checkuserbal',   component: CheckuserbalanceComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
  { path: 'pricing',   component: PricingComponent , canActivate: [AuthGuard] , data: { allowUnAuthAccess: false }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
