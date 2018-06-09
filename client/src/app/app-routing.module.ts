import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '@angular/router/src/config';
// import {AuthGuard} from './app/common/guards/auth.guard';
import { LandingComponent } from './landing/landing.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { UsersComponent } from './users/users.component'
import { MessageComponent } from './message/message.component'
import { ProfileComponent } from './profile/profile.component'
import { FriendsComponent } from './friends/friends.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
    data: {auth: false}
  },
  {
    path: 'friends',
    pathMatch: 'full',
    component: FriendsComponent,
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'users',
    pathMatch: 'full',
    component: UsersComponent,
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
  },
  {
    path: 'messages',
    pathMatch: 'full',
    component: MessageComponent,
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


