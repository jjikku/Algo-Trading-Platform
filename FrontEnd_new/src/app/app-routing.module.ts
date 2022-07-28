import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbooksComponent } from './addbooks/addbooks.component';
import { AuthGuard } from './auth.guard';
import { BooksComponent } from './books/books.component';
import { EditbookComponent } from './editbook/editbook.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SinglebookComponent } from './singlebook/singlebook.component';

const routes: Routes = [
  {path:"",component:HomeComponent,pathMatch: 'full'},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  { path:"books",
    component:BooksComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {path:"singlebook",    
    canActivate: [AuthGuard],
    pathMatch: 'full',
    component:SinglebookComponent
  },
  {path:"singlebook/:id",    
   canActivate: [AuthGuard],
  pathMatch: 'full',
  component:SinglebookComponent
},
  {path:"editbook/:id",   
   canActivate: [AuthGuard],
  pathMatch: 'full', 
  component:EditbookComponent
},
  {path:"addbook",    
  canActivate: [AuthGuard],
  pathMatch: 'full', 
  component:AddbooksComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
