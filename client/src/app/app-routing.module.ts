import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule,CanActivate} from '@angular/router';
import {Route} from '@angular/router/src/config';
import {GuardAuthenticationService as AuthGuard} from './_services/guard-authentication.service';
import {LandingComponent} from './landing/landing.component'
import {HomeComponent} from './home/home.component'
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {UsersComponent} from './users/users.component'
import {MessageComponent} from './message/message.component'
import {ProfileComponent} from './profile/profile.component'
import {FriendsComponent} from './friends/friends.component'
import {ProfilePreviewComponent} from './profile-preview/profile-preview.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
  },
  {
    path: 'friends',
    pathMatch: 'full',
    component: FriendsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    pathMatch: 'full',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'preview',
    pathMatch: 'full',
    component: ProfilePreviewComponent,
    // canActivate: [AuthGuard],    
  },
  {
    path: 'chat/:id',
    pathMatch: 'full',
    component: MessageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ],
  declarations: []
})



export class AppRoutingModule { }


