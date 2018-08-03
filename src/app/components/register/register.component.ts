import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  title = 'Add User';
  angForm: FormGroup;
  constructor(private userservice: UserService, private fb: FormBuilder) {
    this.createForm();
   }
  createForm() {
    this.angForm = this.fb.group({
      fname: ['', Validators.required ],
      lname: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ],    
   });
  }
  addUser(fname,lname,email,password) {
      this.userservice.addUser(fname,lname,email,password);
  }
  ngOnInit() {
  }

}
