import { Component, OnInit } from '@angular/core';
import {  User , Plan } from '../../../_models';
import { UserService, SubscriptionService, PlanService, AssetService, AlertService } from '../../../_services';

@Component({
  selector: 'app-assign-plan',
  templateUrl: './assign-plan.component.html',
  styleUrls: ['./assign-plan.component.css']
})
export class AssignPlanComponent implements OnInit {

  users: User[] = [];
  plans: Plan[] = [];
  currentAsset: Number;
  selectedUser: User;
  showModal:Boolean = false;
  model: any = {};
  loading = false;
  constructor(private userService: UserService, private subscriptionService: SubscriptionService, private assetService:AssetService,private planService: PlanService,  private alertService: AlertService) {
   
}

  ngOnInit() {
    this.loadAllUsers();
    this.getAllPlans();
    this.getCurrentAssetPrice();
  }
  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; 
    });
  }
  private getAllPlans() {
    this.planService.getAll().subscribe(plans => { this.plans = plans; 
    });
  } 
  private getCurrentAssetPrice(){
    this.assetService.getCurrentAssetVal().subscribe(asset => { this.currentAsset = asset[0].price;
    });
  }
  selectuser(user){
    this.selectedUser=user;
    this.showModal=true;
    this.model.amount = 0;
  }
  closeModal(){
    this.showModal=false;
  }
  assignPlan(){
  console.log(this.model)
    this.model.userid = this.selectedUser._id;
    this.model.firstName = this.selectedUser.firstName;
    this.model.lastName = this.selectedUser.lastName;
    this.model.email = this.selectedUser.email;
    this.model.subscriptionDate =  new Date();
    this.model.assetQuantity = parseInt(this.model.amount) / parseInt(this.currentAsset.toString());
    this.model.buyingprice = this.currentAsset;
    this.loading = true;
    
    this.subscriptionService.create(this.model)
        .subscribe(
            data => {
                this.loading = false;
                this.showModal=false;
                this.alertService.success('Plan Assigned successfully', true);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }
}

