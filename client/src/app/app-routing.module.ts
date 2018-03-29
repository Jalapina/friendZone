import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '@angular/router/src/config';
import { LandingComponent } from './landing/landing.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { ProfileComponent } from './profile/profile.component'
import { MessageComponent } from './message/message.component'
 
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
  },
  {
    path: 'message',
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
