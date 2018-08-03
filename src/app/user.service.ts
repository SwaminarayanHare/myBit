import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Injectable()
export class UserService {
  
    constructor(private http: HttpClient) { }
  
    addUser(fname,lname,email,password) {
      console.log("add user");
      const uri = '/users/add';
      const obj = {
        fname: fname,
        lname: lname,
        email: email,
        password: password
      };
      this.http.post(uri, obj)
          .subscribe(res => console.log('Done'));
    }
  }