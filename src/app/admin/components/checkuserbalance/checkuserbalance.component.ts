import { Component, OnInit } from '@angular/core';
import { Subscription,Plan } from '../../../_models';
import { SubscriptionService,PlanService, AlertService } from '../../../_services';


@Component({
  selector: 'app-checkuserbalance',
  templateUrl: './checkuserbalance.component.html',
  styleUrls: ['./checkuserbalance.component.css']
})
export class CheckuserbalanceComponent implements OnInit {

  subscriptions: Subscription[] = [];
  selectedSub:Subscription; 
  showModal = false;
  model: any = {};
  plans: Plan[] = [];
  loading =false;
  constructor(private subscriptionService: SubscriptionService,private planService:PlanService, private alertService:AlertService) {
     
  }
  ngOnInit() {
    this.loadAllSubs();
    this.getAllPlans()
  }
  private loadAllSubs() {
    this.subscriptionService.getAll().subscribe(subscriptions => { this.subscriptions = subscriptions.sort((a, b) => a.subscriptionDate > b.subscriptionDate ? -1 : a.subscriptionDate < b.subscriptionDate ? 1 : 0);; 
    });
}
private getAllPlans() {
  this.planService.getAll().subscribe(plans => { this.plans = plans; 
  });
} 
closeModal(){
  this.showModal=false;
}
selectSubscription(sub){
  this.selectedSub=sub;
  this.showModal=true;
  this.model.amount = 0;
  this.model.assetQuantity = 0;
  this.model.price = 0;
}
deleteSuscription(sub){
 this.loading = true;
  this.subscriptionService.delete(sub._id)
      .subscribe(
          data => {
              this.loading = false;
              this.showModal=false;
              this.loadAllSubs();
              this.alertService.success('Assign Plan Deleted successfully', true);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
}

updateSub(){
  this.loading = true;
  this.model._id= this.selectedSub._id;
  this.model.subscriptionDate =  new Date();
  this.model.assetQuantity = (parseInt(this.model.amount) / parseInt(this.selectedSub.buyingprice.toString())).toFixed(2);
  
  this.subscriptionService.update(this.model)
      .subscribe(
          data => {
              this.loading = false;
              this.showModal=false;
              this.loadAllSubs();
              this.alertService.success('Assign Plan updated successfully', true);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });

}
}

