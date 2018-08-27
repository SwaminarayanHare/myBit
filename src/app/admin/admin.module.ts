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
import { SetcapitalassetComponent } from './components/setcapitalasset/setcapitalasset.component';
import { SetliquidassetComponent } from './components/setliquidasset/setliquidasset.component';
import { CheckuserbalanceComponent } from  './components/checkuserbalance/checkuserbalance.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { AddmanualstockComponent } from './components/addmanualstock/addmanualstock.component';
import { LiveNavComponent } from './components/live-nav/live-nav.component';
import { AdminalertComponent } from '../_directives/adminalert.component';
import { AlertService, AuthenticationService, UserService, PlanService, SubscriptionService, AssetService, StockService} from '../_services';


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
    SetcapitalassetComponent, 
    SetliquidassetComponent,
    AdminalertComponent, 
    CheckuserbalanceComponent,
    AddStockComponent,
    LiveNavComponent,
    AddmanualstockComponent ],
  providers: [
    AlertService,
    AuthenticationService,
    UserService,
    PlanService,
    SubscriptionService,
    AssetService,
    StockService
  ],
  bootstrap: [DashboardComponent]
})
export class AdminModule { }




