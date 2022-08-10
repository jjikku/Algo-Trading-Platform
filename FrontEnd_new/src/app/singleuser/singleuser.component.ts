import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleuserService } from 'src/services/singleuser.service';


@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.css']
})
export class SingleuserComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute, private singleuserservice: SingleuserService, private router: Router) { }
  // users = [
  //   {
  //     _id:Number,
  //     fname: String,
  //     lname:String,
  //     email:String,
  //     isAdmin:Number
  //   }
  // ]
  users = 
    {
      _id:Number,
      fname: String,
      lname:String,
      email:String,
      isAdmin:Number
    }
  
  public params:any  
  ngOnInit(): void {
    this.params = this._ActivatedRoute.snapshot.paramMap.get("id");
    console.log("Params Activated Route = " + this.params);
      
      console.log("Read More Service Called (Single User)");    
        this.singleuserservice.readmore(this.params)
        .subscribe((data) => {
          if(data)
          {
            console.log("Single User Form Component data fetch")
            console.log(data);
            this.users = JSON.parse(JSON.stringify(data));
            // console.log(this.users);
          }
    });
    
  }

editUser(id:any){
    this.router.navigate(['/edituser/'+id]);

}
addUser(){
  this.router.navigate(['/adduser']);

}
deleteUser(id:any){
  this.singleuserservice.deleteUser(id)
  .subscribe((data) => {
    console.log("User Deleted");
    console.log(data);
    alert("User Deleted");
    this.router.navigate(['/users']);
  });



  }

}



