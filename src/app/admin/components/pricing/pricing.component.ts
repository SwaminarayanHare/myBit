import { Component, OnInit } from '@angular/core';
import {  Asset } from '../../../_models';
import { AssetService, AlertService } from '../../../_services';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  assets: Asset[] = [];
  selectedAsset: Asset;
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
    });
}

addAsset() {
  console.log(this.model);
  console.log('add');
  this.loading = true;
  this.model.date = new Date();
  this.model.iscurrent = true;
  this.assetService.create(this.model)
      .subscribe(
          data => {
              this.alertService.success('Asset Added successfully', true);
              this.loadAllAssets();
              this.loading = false;
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
}

selectAsset(asset){
  this.selectedAsset=asset;
  this.showModal=true;
  this.model.price = 0;
}
closeModal(){
  this.showModal=false;
}
updateAsset(){
  
console.log(this.updateassetmodel);
  this.updateassetmodel._id = this.selectedAsset._id;
  this.updateassetmodel.date = new Date();;

  this.loading = true;
  
  this.assetService.update(this.updateassetmodel)
      .subscribe(
          data => {
              this.loading = false;
              this.showModal=false;
              this.loadAllAssets();
              this.alertService.success('Asset updated successfully', true);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
}



}





