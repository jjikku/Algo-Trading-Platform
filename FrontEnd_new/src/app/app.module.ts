import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BooksComponent } from './books/books.component';
import { AddbooksComponent } from './addbooks/addbooks.component';
import { SinglebookComponent } from './singlebook/singlebook.component';
import { HeaderComponent } from './header/header.component';
import { AuthService  } from 'src/services/auth.service';
import { AuthGuard } from './auth.guard';
import { TokeninterceptorService } from 'src/services/tokeninterceptor.service';
import { EditbookComponent } from './editbook/editbook.component'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StrategyComponent } from './strategy/strategy.component';
import { AddstrategyComponent } from './addstrategy/addstrategy.component';
import { SinglestrategyComponent } from './singlestrategy/singlestrategy.component';
import { EditstrategyComponent } from './editstrategy/editstrategy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from '@angular/common'
import {StratpnlComponent} from './stratpnl/stratpnl.component'

import { UsersComponent } from './users/users.component';
import { SingleuserComponent } from './singleuser/singleuser.component';
//import { EdituserComponent } from './edituser/edituser.component';
import { AdduserComponent } from './adduser/adduser.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    BooksComponent,
    AddbooksComponent,
    SinglebookComponent,
    HeaderComponent,
    EditbookComponent,
    StrategyComponent,
    AddstrategyComponent,
    SinglestrategyComponent,
    EditstrategyComponent,
    StratpnlComponent,
    UsersComponent,
    SingleuserComponent,
    //EdituserComponent,
    AdduserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    NgxMaskModule.forRoot({
			validation: true,
		})
  ],
  providers: [AuthService, AuthGuard, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokeninterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
