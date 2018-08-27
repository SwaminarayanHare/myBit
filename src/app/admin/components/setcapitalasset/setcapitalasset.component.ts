import { Component, OnInit } from '@angular/core';
import {  Asset } from '../../../_models';
import { AssetService, AlertService } from '../../../_services';

@Component({
  selector: 'app-pricing',
  templateUrl: './setcapitalasset.component.html',
  styleUrls: ['./setcapitalasset.component.css']
})
export class SetcapitalassetComponent implements OnInit {

  assets: Asset[] = [];
  selectedCapitalAsset: Asset;
  capitalAssets:Asset[] = [];
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
       this.capitalAssets=[];
        this.assets.forEach(ele=>{
        if(ele.iscapital==true){
            this.capitalAssets.push(ele);
        }
    });
    });
}

addCapitalAsset() {
  this.loading = true;
  this.model.date = new Date();
  this.model.iscurrent = true;
  this.model.iscapital=true;
  this.model.isliquid=false;
  this.assetService.create(this.model)
      .subscribe(
          data => {
              this.alertService.success('Capital Fund Quantity Added successfully', true);
              this.loadAllAssets();
              this.loading = false;
              this.model.quantity = 0;
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
}


selectCapitalAsset(asset){
  this.selectedCapitalAsset=asset;
  this.showModal=true;
  this.model.quantity = 0;
  this.updateassetmodel.quantity = 0;
}
closeModal(){
  this.showModal=false;
}
updateCapitalAsset(){
  this.updateassetmodel._id = this.selectedCapitalAsset._id;
  this.updateassetmodel.date = new Date();
  this.loading = true;
  
  this.assetService.update(this.updateassetmodel)
      .subscribe(
          data => {
              this.loading = false;
              this.showModal=false;
              this.loadAllAssets();
              this.alertService.success('Quantity updated successfully', true);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
}
}





