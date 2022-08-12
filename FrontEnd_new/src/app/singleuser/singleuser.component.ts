import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleuserService } from 'src/services/singleuser.service';
import { AuthService } from 'src/services/auth.service';
import { number } from 'echarts';


@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.css']
})
export class SingleuserComponent implements OnInit {
  public usertype:String=""
  constructor(private _ActivatedRoute:ActivatedRoute, private singleuserservice: SingleuserService, private router: Router,public _auth: AuthService) { }
  users = 
    {
      _id:Number,
      fname: String,
      lname:String,
      email:String,
      isAdmin:Number,
      blockstatus:Number
    }
  public params:any  
  ngOnInit(): void {
    this.params = this._ActivatedRoute.snapshot.paramMap.get("id");
    console.log("Params Activated Route = " + this.params);
      console.log("Read More Service Called (Single User)");    
        this.singleuserservice.readmore(this.params)
        .subscribe((data) => {
          //console.log(data);
          // if(data==0)
          // {
          //   this.usertype="Normal"
          // }

          if(data)
          {
            console.log("Single User Form Component data fetch")
            console.log(data);
            this.users = JSON.parse(JSON.stringify(data));
            var usertypea:any=this.users.blockstatus;
             if(usertypea==1)
             {
              this.usertype="Normal";
             }
          }
    });
    
  }

editUser(id:any){
    this.router.navigate(['/edituser/'+id]);

}
addUser(){
  this.router.navigate(['/adduser']);

}
// deleteUser(id:any){
//   this.singleuserservice.deleteUser(id)
//   .subscribe((data) => {
//     console.log("User Deleted");
//     console.log(data);
//     alert("User Deleted");
//     this.router.navigate(['/users']);
//   });

//   }
blockUser(id:any){
  console.log("BlockUser"+ id) ;
  this.singleuserservice.blockUser(id,this.users)
  .subscribe((data) => {
    console.log("User Blocked");
    console.log(data);
    alert("User Blocked");
    this.router.navigate(['/users']);
  });

}
// getUserAdminStatus(admstatus:any){
//   console.log(admstatus);
//   // if(admstatus==1)
//   // {
//   // return.this("Admin")
//   // }

// }
}



