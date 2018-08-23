import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../_models';
import { SubscriptionService } from '../../../_services';


@Component({
  selector: 'app-checkuserbalance',
  templateUrl: './checkuserbalance.component.html',
  styleUrls: ['./checkuserbalance.component.css']
})
export class CheckuserbalanceComponent implements OnInit {

  subscriptions: Subscription[] = [];
  constructor(private subscriptionService: SubscriptionService) {
     
  }
  ngOnInit() {
    this.loadAllSubs();
  }
  private loadAllSubs() {
    this.subscriptionService.getAll().subscribe(subscriptions => { this.subscriptions = subscriptions; 
    });
}

}

