import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { MessageComponent } from './message/message.component';
import { UserService } from './_services/user.service'
import { MessageService } from './_services/message.service';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component'

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
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [
    UserService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
