import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './_helpers/jwt.interceptor'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { MessageComponent } from './message/message.component';
import { UserService } from './_services/user.service'
import { GuardAuthenticationService } from './_services/guard-authentication.service'
import { MessageService } from './_services/message.service';
import { AuthenticateService } from './_services/authenticate.service'
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component'
import { TagInputModule } from 'ngx-chips';
import { ProfilePreviewComponent } from './profile-preview/profile-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    MessageComponent,
    ProfileComponent,
    FriendsComponent,
    ProfilePreviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    TagInputModule,
  ],
  providers: [
    UserService,
    MessageService,
    GuardAuthenticationService,
    AuthenticateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
