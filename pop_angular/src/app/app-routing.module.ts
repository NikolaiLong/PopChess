import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlayComponent} from './play/play.component';
import {ProfileComponent} from './profile/profile.component';
import {GameComponent} from './game/game.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {GameService} from './_services/game.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: PlayComponent, canActivate: [GameService]},
  {path: 'game', component: GameComponent, canActivate: [GameService]},
  {path: 'profile', component: ProfileComponent, canActivate: [GameService]},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
