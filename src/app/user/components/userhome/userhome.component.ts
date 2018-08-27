import { Component, OnInit } from '@angular/core';
import { Subscription ,User,Stock,Asset } from '../../../_models';
import { AssetService,SubscriptionService, AlertService, PricingService, StockService } from '../../../_services';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  currentUser: User;
  subscription: Subscription;
  unitPrice: Number;
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
  loading = false;
  constructor(private subscriptionService: SubscriptionService, private assetService: AssetService, private pricingService: PricingService, private stockService:StockService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getuserSubscription();
    this.getAssetUserQuantity();
    this.getLatestCoinPrice();
  
  }
  getuserSubscription(){
   this.subscriptionService.getByUserId(this.currentUser._id).subscribe(sub => { this.subscription = sub[0];
   });
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
  this.loading=false;
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
  this.getAssetUserQuantity();
  this.getLatestCoinPrice();
}

}
