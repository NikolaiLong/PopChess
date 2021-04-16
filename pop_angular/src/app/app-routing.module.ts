import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlayComponent} from './play/play.component';
import {ProfileComponent} from './profile/profile.component';
import {GameComponent} from './game/game.component';

const routes: Routes = [
  {path: 'game', component: GameComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', component: PlayComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
