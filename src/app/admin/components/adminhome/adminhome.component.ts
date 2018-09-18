import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models';
import { UserService, ExcelService } from '../../../_services';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  currentUser: User;
  users: User[] = [];
  constructor(private userService: UserService, private excelService: ExcelService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }
  exportAsXLSX():void {
   var temp  = JSON.parse(JSON.stringify(this.users));
   temp.forEach(function(x){
    delete x._id;
    delete x.password;
    delete x.isAdmin;
    delete x.reset_password_expires;
    delete x.reset_password_token;
    delete x.hash_password;    
   });
   this.excelService.exportAsExcelFile(temp, 'report');
  }  
  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users.sort((a, b) => a.doj > b.doj ? -1 : a.doj < b.doj ? 1 : 0); 
    });
}
}
