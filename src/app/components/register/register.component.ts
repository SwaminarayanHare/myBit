import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { UserService, AlertService } from  '../../_services';

const now = new Date();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;
  datemodel: NgbDateStruct;
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  date: {year: number, month: number};
        
  constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService
      ) { }

  register() {
      this.loading = true;
      this.model.dob=this.datemodel.day+'/'+this.datemodel.month+'/'+this.datemodel.year;
      this.model.doj= new Date();;
      delete this.model.cpassword;
      this.userService.create(this.model)
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/login']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
  ngOnInit() {
   
    this.minDate = {year: 1950, month: 1, day: 1};
    this.maxDate = {year: parseInt( now.getFullYear.toString()), month: 1, day: 1};
  
}

  

}
