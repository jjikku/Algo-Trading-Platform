import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  username=""
  fname: BehaviorSubject<any>;
  constructor() {
    this.fname  = new BehaviorSubject(this.username);
  }
  setuser(username:any) {
    this.fname = username;
  }
  getuser() {
    return this.fname;
  }
}
