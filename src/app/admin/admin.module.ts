import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { DashboardComponent } from './components/dashboard/dashboard.component'
import { AdminRoutingModule } from './admin-routing.module';
import { CommoncomponentModule } from '../commoncomponent/commoncomponent.module';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { AdminhomeComponent } from  './components/adminhome/adminhome.component';
import { AddPlansComponent } from './components/add-plans/add-plans.component';
import { AssignPlanComponent } from  './components/assign-plan/assign-plan.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { CheckuserbalanceComponent } from  './components/checkuserbalance/checkuserbalance.component';
import { AdminalertComponent } from '../_directives/adminalert.component';
import { AlertService, AuthenticationService, UserService, PlanService, SubscriptionService, AssetService} from '../_services';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    CommoncomponentModule
  ],
  declarations: [ 
    DashboardComponent,
    VerifyUserComponent,
    AdminhomeComponent, 
    AddPlansComponent, 
    AssignPlanComponent,
    PricingComponent, 
    AdminalertComponent, 
    CheckuserbalanceComponent ],
  providers: [
    AlertService,
    AuthenticationService,
    UserService,
    PlanService,
    SubscriptionService,
    AssetService
  ],
  bootstrap: [DashboardComponent]
})
export class AdminModule { }




