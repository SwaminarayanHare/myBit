import { Component, OnInit } from '@angular/core';
import {  Asset,Coin } from '../../../_models';
import { AssetService, AlertService } from '../../../_services';

@Component({
  selector: 'app-setliquidasset',
  templateUrl: './setliquidasset.component.html',
  styleUrls: ['./setliquidasset.component.css']
})
export class SetliquidassetComponent implements OnInit {

  assets: Asset[] = [];
  selectedLiquidAsset: Asset;
  liquidAssets:Asset[] = [];
  showModal:Boolean = false;
  model: any = {};
  updateassetmodel : any = {};
  loading = false;

  constructor(private assetService: AssetService,  private alertService: AlertService) {
  }

  ngOnInit() {
    this.loadAllAssets();
  }
  private loadAllAssets() {
    this.assetService.getAll().subscribe(asset => { this.assets = asset.sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0)
      this.liquidAssets=[];  
      this.assets.forEach(ele=>{
        if(ele.isliquid==true){
            this.liquidAssets.push(ele);
        }
    });
    });
}
addLiquidAsset() {
  this.loading = true;
  this.model.date = new Date();
  this.model.iscurrent = true;
  this.model.iscapital=false;
  this.model.isliquid=true;
  this.assetService.create(this.model)
      .subscribe(
          data => {
              this.alertService.success('Liquid Fund Quantity Added successfully', true);
              this.loadAllAssets();
              this.loading = false;
              this.model.quantity = 0;
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
}

selectLiquidAsset(asset){
  this.selectedLiquidAsset=asset;
  this.showModal=true;
  this.model.quantity = 0;
  this.updateassetmodel.quantity=0;
}
  updateLiquidAsset(){
    this.updateassetmodel._id = this.selectedLiquidAsset._id;
    this.updateassetmodel.date = new Date();
    this.loading = true;
    
    this.assetService.update(this.updateassetmodel)
        .subscribe(
            data => {
                this.loading = false;
                this.showModal=false;
                this.loadAllAssets();
                this.alertService.success('Unit Quantity updated successfully', true);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }
  closeModal(){
    this.showModal=false;
  }

}
