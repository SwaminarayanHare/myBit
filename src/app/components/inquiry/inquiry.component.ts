import { Component, OnInit } from '@angular/core';
import { AlertService, InquiryService } from  '../../_services';

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
      private alertService: AlertService, private inquiryService: InquiryService
      ) { }

  inquiry() {
      this.loading = true;
      this.model.date = new Date();
       this.model.isFulfilled= false;
      this.inquiryService.create(this.model)
          .subscribe(
              data => {
                  this.alertService.success('We have received your Inquiry! Our executive will get back to you soon.Cheers!!', true);
                   this.loading = false;
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
  ngOnInit() {
   

  
}

  

}
