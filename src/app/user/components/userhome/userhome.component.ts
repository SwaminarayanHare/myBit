import { Component, OnInit } from '@angular/core';
import { Subscription ,User } from '../../../_models';
import {  SubscriptionService } from '../../../_services';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  currentUser: User;
  subscription: Subscription[]=[];
  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getuserSubscription();
  }
  getuserSubscription(){
   this.subscriptionService.getByUserId(this.currentUser._id).subscribe(sub => { this.subscription = sub[0]; console.log(this.subscription)
   });
  }

}
