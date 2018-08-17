import { Component, OnInit } from '@angular/core';
import {UserService, AlertService } from  '../../_services';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  
  constructor(private alertService: AlertService, private userService: UserService) { }


  fPassword() {
    this.loading = true;
    this.userService.forgotpassword(this.model)
        .subscribe(
            data => {
              this.alertService.success('Reset password mail sent successfully! Please check your mailbox.');
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
