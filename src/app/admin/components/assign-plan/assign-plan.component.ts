import { Component, OnInit } from '@angular/core';
import {  User , Plan, Stock, Asset } from '../../../_models';
import { UserService, SubscriptionService, PlanService, AssetService, AlertService,PricingService, StockService } from '../../../_services';

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
  assets: any= [];
  stocks: Stock[] = [];
  selectedLiquidAsset: Asset;
  liquidAssetsUserQty:Number;
  capitalAssetsUserQty:Number;
  navQuantity:number;
  capMstocks: Stock[] = [];
  capDstocks: Stock[] = [];
  liqMstocks: Stock[] = [];
  liqDstocks: Stock[] = [];
  liquidnavprice : Number;
  capitalnavprice : Number;

  showModal:Boolean = false;
  model: any = {};
  loading = false;
  constructor(private userService: UserService, private subscriptionService: SubscriptionService, private assetService:AssetService,private planService: PlanService,  private alertService: AlertService, private stockService:StockService,private pricingService:PricingService) {
   
}

  ngOnInit() {
    this.loadAllUsers();
    this.getAllPlans();
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; 
    });
  }
  private getAllPlans() {
    this.planService.getAll().subscribe(plans => { this.plans = plans; 
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
    this.refreshdata();
    this.getAssetUserQuantity();
    this.getLatestCoinPrice();
  }

  private getLatestCoinPrice(){
    this.loading=true;
     this.pricingService.getData().subscribe(apidata=>{
        let count=0;
        this.stockService.getAll().subscribe(stocks=>{
          this.stocks=stocks;
          this.stocks.forEach(st=>{
                  if(st.ismanual==true && st.iscapital==true){
                      this.capMstocks.push(st);
                  }
                  else if(st.ismanual==true && st.isliquid==true){
                      this.liqMstocks.push(st);
                  }
                  else if(st.ismanual==false && st.iscapital==true){
                    this.capDstocks.push(st);
                  }
                  else if(st.ismanual==false && st.isliquid==true){
                    this.liqDstocks.push(st);
                  }
          });

          this.getcapitalnavprice (this.capMstocks,this.capDstocks,apidata);
          this.getliquidnavprice(this.liqMstocks,this.liqDstocks,apidata);

        });
      });
}

private getcapitalnavprice(capitalMStock,capitalDStock,apidata){
  this.capitalnavprice = 0;
  //manual capital stock price calculation
  capitalMStock.forEach(manuals=>{
        let multiplication = parseFloat(manuals.price.toString()) * parseFloat(manuals.quantity.toString());
        this.capitalnavprice= parseFloat(this.capitalnavprice.toString()) + multiplication;
});
 //dynamic capital stock price calculation
  apidata.forEach(coin=>{
    capitalDStock.forEach(dStock=>{
        if(coin.symbol == dStock.coin.symbol){
          let multiplication = parseFloat(coin.price_inr.toString()) * parseFloat(dStock.quantity.toString());
          this.capitalnavprice= parseFloat(this.capitalnavprice.toString()) + multiplication;
        }
    });  
  });

    this.capitalnavprice = (parseFloat(this.capitalnavprice.toString())/parseFloat(this.capitalAssetsUserQty.toString()));
      this.capitalnavprice = parseFloat(this.capitalnavprice.toFixed(2));

      if(this.model.planid.name.toString().toLowerCase().includes('capital') || this.model.planid.name.toString().toLowerCase().includes('sip')){
        this.model.userid = this.selectedUser._id;
        this.model.firstName = this.selectedUser.firstName;
        this.model.lastName = this.selectedUser.lastName;
        this.model.email = this.selectedUser.email;
        this.model.subscriptionDate =  new Date();
        this.model.assetQuantity = (parseInt(this.model.amount) / parseInt(this.capitalnavprice.toString())).toFixed(2);
        this.model.buyingprice = this.capitalnavprice;
       
        
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
private getliquidnavprice(liquidMstock,liquidDstock,apidata){
  this.liquidnavprice = 0;
   //manual liquid stock price calculation
  liquidMstock.forEach(manuals=>{
        let multiplication = parseFloat(manuals.price.toString()) * parseFloat(manuals.quantity.toString());
        this.liquidnavprice= parseFloat(this.liquidnavprice.toString()) + multiplication;
});

 //dynamic liquid stock price calculation
 apidata.forEach(coin=>{
  liquidDstock.forEach(dStock=>{
      if(coin.symbol == dStock.coin.symbol){
        let multiplication = parseFloat(coin.price_inr.toString()) * parseFloat(dStock.quantity.toString());
        this.liquidnavprice= parseFloat(this.liquidnavprice.toString()) + multiplication;
      }
  });  
});

  this.liquidnavprice = (parseFloat(this.liquidnavprice.toString())/parseFloat(this.liquidAssetsUserQty.toString()));
  this.liquidnavprice = parseFloat(this.liquidnavprice.toFixed(2));
 
if(this.model.planid.name.toString().toLowerCase().includes('liquid')){
  this.model.userid = this.selectedUser._id;
  this.model.firstName = this.selectedUser.firstName;
  this.model.lastName = this.selectedUser.lastName;
  this.model.email = this.selectedUser.email;
  this.model.subscriptionDate =  new Date();
  this.model.assetQuantity = (parseInt(this.model.amount) / parseInt(this.liquidnavprice.toString())).toFixed(2);
  this.model.buyingprice = this.liquidnavprice;
 
  
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

private getAssetUserQuantity(){
  this.assetService.getCurrentAssetVal().subscribe(asset => { 
    this.assets= asset;
      this.assets.forEach(element => {
          if(element.iscapital==true){
              this.capitalAssetsUserQty=element.quantity;
          }
          else{
            this.liquidAssetsUserQty = element.quantity;
          }
      });
  });

}
refreshdata(){
  this.liquidnavprice = 0;
  this.capitalnavprice = 0;
  this.capMstocks= [];
  this.capDstocks= [];
  this.liqMstocks = [];
  this.liqDstocks = [];
}


}

