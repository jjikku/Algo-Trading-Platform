import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  username="";
  IsAdmin=0;
  email ="";
  fname: BehaviorSubject<any>;
  IsAdm: BehaviorSubject<any>;
  userId:BehaviorSubject<any>;

  constructor() {
    this.fname  = new BehaviorSubject(this.username),
    this.IsAdm  = new BehaviorSubject(this.IsAdmin),
    this.userId  = new BehaviorSubject(this.email)

  }
  setuser(username:any,IsAdmin:any, email:any) {
    this.fname = username;
    this.IsAdm = IsAdmin;
    this.userId = email;
    //console.log(this.IsAdm);
  }
  
  getuser() {
    return this.fname;
    
  }
  getuserId() {
    return this.userId;
    
  }
  getuserType() {
    //console.log(this.IsAdm);
    return this.IsAdm;
  }
}