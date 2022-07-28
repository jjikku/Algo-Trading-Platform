import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:any;
  constructor(private userService: UserService, public _auth: AuthService) { }

  ngOnInit(): void {
    
    
  }
  getuser(){
    if(this._auth.loggedIn())
    {
      this.username = this.userService.getuser();
      console.log("header "+ this.username);
    }
  }
}
