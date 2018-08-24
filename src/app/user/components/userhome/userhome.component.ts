import { Component, OnInit } from '@angular/core';
import { Subscription ,User } from '../../../_models';
import {  SubscriptionService, AssetService } from '../../../_services';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  currentUser: User;
  subscription: Subscription;
  unitPrice: Number;
  
  constructor(private subscriptionService: SubscriptionService, private assetService: AssetService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getuserSubscription();
    this.getCurrentAssetPrice();
  }
  getuserSubscription(){
   this.subscriptionService.getByUserId(this.currentUser._id).subscribe(sub => { this.subscription = sub[0];
   });
  }
  private getCurrentAssetPrice(){
    this.assetService.getCurrentAssetVal().subscribe(asset => { this.unitPrice = asset[0].price;
    });
  }

}
