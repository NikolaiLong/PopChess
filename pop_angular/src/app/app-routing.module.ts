import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlayComponent} from './play/play.component';
import {ProfileComponent} from './profile/profile.component';
import {GameComponent} from './game/game.component';

const routes: Routes = [
  {path: '', component: PlayComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'game', component: GameComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
