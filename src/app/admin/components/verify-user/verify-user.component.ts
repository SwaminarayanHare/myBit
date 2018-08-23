import { Component, OnInit } from '@angular/core';
import {  User } from '../../../_models';
import { UserService, AlertService } from '../../../_services';
@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  users: User[] = [];
  selectedUser: User;
  showModal:Boolean = false;
  model: any = {};
  loading = false;
  constructor(private userService: UserService, private alertService: AlertService) {
   
  }

  ngOnInit() {
    this.loadAllUnVerifiedUsers();
  }
  private loadAllUnVerifiedUsers() {
    this.userService.getAllUnVerified().subscribe(users => { this.users = users; 
    });
  }
 
  selectuser(user){
    this.selectedUser=user;
    this.showModal=true;
  }
  closeModal(){
    this.showModal=false;
  }
  verifyUser(){
  console.log(this.model)
    this.model._id = this.selectedUser._id;
    this.model.isApproved = true;
    this.loading = true;
    this.userService.update(this.model)
        .subscribe(
            data => {
                this.loading = false;
                this.showModal=false;
                this.loadAllUnVerifiedUsers();
                this.alertService.success('Plan Assigned successfully', true);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }
}



