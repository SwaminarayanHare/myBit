import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models';
import { UserService } from '../../../_services';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  currentUser: User;
  users: User[] = [];
  constructor(private userService: UserService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
    this.loadAllUsers();
  }
  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users.sort((a, b) => a.doj > b.doj ? -1 : a.doj < b.doj ? 1 : 0); 
    });
}
}
