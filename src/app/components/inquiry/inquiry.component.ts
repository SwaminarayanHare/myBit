import { Component, OnInit } from '@angular/core';
import { AlertService } from  '../../_services';

const now = new Date();

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent implements OnInit {
  model: any = {};
  loading = false;
   products: any = ["Health Insurance",
"Two Wheeler Insurance",
"Term Life Insurance",
"Car Insurance",
"Home Insurance",
"Child Plan",
"Personal Loan",
"Home Loan",
"Mortage Loan"];     
  constructor(
      private alertService: AlertService
      ) { }

  inquiry() {
  			console.log(this.model);
  			this.loading=true;
  }
  ngOnInit() {
   

  
}

  

}
