import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdatedocumentComponent } from './components/updatedocument/updatedocument.component';
import { UserhomeComponent } from './components/userhome/userhome.component';
import { CommoncomponentModule } from '../commoncomponent/commoncomponent.module';
import { FormsModule }   from '@angular/forms';
import {  SubscriptionService, AssetService, StockService,PricingService } from '../_services';

@NgModule({
  imports: [
    CommonModule,
    CommoncomponentModule,
    UserRoutingModule,
    FormsModule
  ],
  declarations: [ DashboardComponent, UserhomeComponent, UpdatedocumentComponent ],
  providers:[ SubscriptionService, AssetService , StockService, PricingService]
})
export class UserModule { }
