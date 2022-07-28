import { Component, OnInit } from '@angular/core';
import { LoginperformedService } from 'src/services/loginperformed.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private userService: UserService, public _auth: AuthService, private _login:LoginperformedService, private _loginForm: FormBuilder, private router:Router) { }
  loginForm = this._loginForm.group({
    email: ["",[Validators.required, Validators.pattern("^([a-zA-Z0-9\-\._]+)@([A-Za-z\-]+)\.([a-z]{2,3}(\.[a-z]{2,3})?)$")]],
    pwd: ["",[Validators.required,Validators.minLength(8)]]
  });
  
  
  ngOnInit(): void {
  }
  login()
  {    
    const email = this.loginForm.controls['email'].value;
    const pwd = this.loginForm.controls['pwd'].value;

    const item = {
      email,
      pwd
    }

    console.log("Service Called");    
    console.log(item);
    this._login.login(item)
    .subscribe((data) => {
      let status = data.status;
      if(!status)
      {
        alert("Incorrect Username/Password");
      }
      else
      {
        localStorage.setItem("token",data.token)
        console.log("token set");
        console.log(data.token)
        console.log(data.fname);
        this.userService.setuser(data.fname);
        this.router.navigate(["/books"]);
      }

    })

  }
}