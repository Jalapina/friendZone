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
import {PasswordResetComponent} from './password-reset/password-reset.component'
import {PasswordResetConfirmationComponent} from './password-reset-confirmation/password-reset-confirmation.component'
import {NotFoundComponent} from './not-found/not-found.component'
import {SettingsComponent} from './settings/settings.component'
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
    path: 'users/:term',
    pathMatch: 'full',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'preview/:id',
    pathMatch: 'full',
    component: ProfilePreviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat/:id/:term',
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
  {
    path: 'password_reset',
    pathMatch: 'full',
    component: PasswordResetComponent,
  },
  {
    path: 'password_reset/token/:id',
    pathMatch: 'full',
    component: PasswordResetConfirmationComponent
  },
  {
    path: 'settings',
    pathMatch: 'full',
    component: SettingsComponent,
  },
  {
    path: '404',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ],
  declarations: []
})



export class AppRoutingModule { }


