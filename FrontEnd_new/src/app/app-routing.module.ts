import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbooksComponent } from './addbooks/addbooks.component';
import { AddstrategyComponent } from './addstrategy/addstrategy.component';
import { AuthGuard } from './auth.guard';
import { BooksComponent } from './books/books.component';
import { EditbookComponent } from './editbook/editbook.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SinglebookComponent } from './singlebook/singlebook.component';
import { SinglestrategyComponent } from './singlestrategy/singlestrategy.component';
import { StrategyComponent } from './strategy/strategy.component';
import { EditstrategyComponent } from './editstrategy/editstrategy.component';
import { StratpnlComponent } from './stratpnl/stratpnl.component';


import { AdduserComponent } from './adduser/adduser.component';
import { SingleuserComponent } from './singleuser/singleuser.component';
import { UsersComponent } from './users/users.component';
//import { EdituserComponent } from './edituser/edituser.component';


const routes: Routes = [
  {path:"",component:HomeComponent,pathMatch: 'full'},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"googlelogin",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  { path:"strategy",
    component:StrategyComponent,
    // canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {path:"singlestrategy",    
    canActivate: [AuthGuard],
    pathMatch: 'full',
    component:SinglestrategyComponent
  },
  {path:"singlestrategy/:id",    
   canActivate: [AuthGuard],
  pathMatch: 'full',
  component:SinglestrategyComponent
},
  {path:"editbook/:id",   
   canActivate: [AuthGuard],
  pathMatch: 'full', 
  component:EditbookComponent
},
{
    path: 'strategy/edit/:Id',
    component: EditstrategyComponent
},
{path:"addstrategy",    
  // canActivate: [AuthGuard],
  pathMatch: 'full', 
  component:AddstrategyComponent
},
{path:"deploy/:id",    
  // canActivate: [AuthGuard],
  pathMatch: 'full', 
  component:StratpnlComponent
},
{
  path:"users",    
  canActivate: [AuthGuard],
  pathMatch: 'full', 
  component:UsersComponent
},
{
  path:"adduser",    
  canActivate: [AuthGuard],
  pathMatch: 'full', 
  component:AdduserComponent
},
{  path:"singleuser",    
   canActivate: [AuthGuard],
   pathMatch: 'full',
   component:SingleuserComponent
},
{
  path:"singleuser/:id",    
  canActivate: [AuthGuard],
  pathMatch: 'full',
  component:SingleuserComponent
},
// {
//   path:"edituser/:id",   
//   canActivate: [AuthGuard],
//   pathMatch: 'full', 
//   component:EdituserComponent
// },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
