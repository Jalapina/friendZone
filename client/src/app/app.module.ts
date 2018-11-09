import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './_helpers/jwt.interceptor'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImageUploadModule } from "angular2-image-upload";
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { MessageComponent } from './message/message.component';
import { UserService } from './_services/user.service'
import { GuardAuthenticationService } from './_services/guard-authentication.service'
import { FriendshipService } from './_services/friendship.service'
import { MessageService } from './_services/message.service';
import { AuthenticateService } from './_services/authenticate.service'
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component'
import { TagInputModule } from 'ngx-chips';
import { SwingModule } from 'angular2-swing';
import { ProfilePreviewComponent } from './profile-preview/profile-preview.component';
import { HeaderComponent } from './_shared/header/header.component';
import { LandingHeaderComponent } from './_shared/landing-header/landing-header.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetConfirmationComponent } from './password-reset-confirmation/password-reset-confirmation.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
    ProfilePreviewComponent,
    HeaderComponent,
    LandingHeaderComponent,
    PasswordResetComponent,
    PasswordResetConfirmationComponent,
    NotFoundComponent,
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
    SwingModule,
    CommonModule,
    ImageUploadModule.forRoot(),  
  ],
  exports:[
    HeaderComponent
  ],
  providers: [
    UserService,
    MessageService,
    FriendshipService,
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
