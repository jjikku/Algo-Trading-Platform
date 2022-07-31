import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  username=""
  IsAdmin=0
  fname: BehaviorSubject<any>;
  IsAdm: BehaviorSubject<any>;
  constructor() {
    this.fname  = new BehaviorSubject(this.username),
    this.IsAdm  = new BehaviorSubject(this.IsAdmin)
  }
  setuser(username:any,IsAdmin:any) {
    this.fname = username;
    this.IsAdm = IsAdmin;
    //console.log(this.IsAdm);
  }
  
  getuser() {
    return this.fname;
    
  }
  getuserType() {
    //console.log(this.IsAdm);
    return this.IsAdm;
  }
}
