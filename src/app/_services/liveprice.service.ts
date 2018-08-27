import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {  Asset, Stock } from '../_models';
import { AssetService, AlertService, PricingService, StockService } from '../_services';

@Injectable()
export class LivepriceService {
    
  assets: any= [];
  stocks: Stock[] = [];
  selectedLiquidAsset: Asset;
  coin: any = {};
  liquidAssetsUserQty:Number;
  capitalAssetsUserQty:Number;
  navQuantity:number;
  model: any = {};
  updateassetmodel : any = {};
  capMstocks: any[] = [];
  capDstocks: any[] = [];
  liqMstocks: any[] = [];
  liqDstocks: any[] = [];
  liquidnavprice : Number;
  capitalnavprice : Number;
  loading = false;
    constructor(private assetService: AssetService,  private alertService: AlertService, private pricingService: PricingService, private stockService:StockService) {
   
    }

    getliveprice(): Observable<any[]>{
        this.liquidnavprice = 0;
        this.capitalnavprice = 0;
        this.capMstocks= [];
        this.capDstocks= [];
        this.liqMstocks = [];
        this.liqDstocks = [];
        this.loading=true;
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
   
             this.capitalnavprice = 0;
             //manual capital stock price calculation
             this.capMstocks.forEach(manuals=>{
                   let multiplication = parseFloat(manuals.price.toString()) * parseFloat(manuals.quantity.toString());
                   this.capitalnavprice= parseFloat(this.capitalnavprice.toString()) + multiplication;
           });
            //dynamic capital stock price calculation
             apidata.forEach(coin=>{
                this.capDstocks.forEach(dStock=>{
                   if(coin.symbol == dStock.coin.symbol){
                     let multiplication = parseFloat(coin.price_inr.toString()) * parseFloat(dStock.quantity.toString());
                     this.capitalnavprice= parseFloat(this.capitalnavprice.toString()) + multiplication;
                   }
               });  
             });
           
               this.capitalnavprice = (parseFloat(this.capitalnavprice.toString())/parseFloat(this.capitalAssetsUserQty.toString()));
                 this.capitalnavprice = parseFloat(this.capitalnavprice.toFixed(2));
                 this.liquidnavprice = 0;
                 //manual liquid stock price calculation
                 this.liqMstocks.forEach(manuals=>{
                      let multiplication = parseFloat(manuals.price.toString()) * parseFloat(manuals.quantity.toString());
                      this.liquidnavprice= parseFloat(this.liquidnavprice.toString()) + multiplication;
              });
              
               //dynamic liquid stock price calculation
               apidata.forEach(coin=>{
                this.liqDstocks.forEach(dStock=>{
                    if(coin.symbol == dStock.coin.symbol){
                      let multiplication = parseFloat(coin.price_inr.toString()) * parseFloat(dStock.quantity.toString());
                      this.liquidnavprice= parseFloat(this.liquidnavprice.toString()) + multiplication;
                    }
                });  
              });
              
                this.liquidnavprice = (parseFloat(this.liquidnavprice.toString())/parseFloat(this.liquidAssetsUserQty.toString()));
                this.liquidnavprice = parseFloat(this.liquidnavprice.toFixed(2));
                this.loading=false;


           });
          
         });
         return of([{'capitalnavprice':of(this.capitalnavprice),'liquidnavprice':of(this.liquidnavprice)}]);
    }
  
}