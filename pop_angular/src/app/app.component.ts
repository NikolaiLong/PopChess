import {Component, OnInit} from '@angular/core';
import * as coercion from '@angular/cdk/coercion';
import * as keycodes from '@angular/cdk/keycodes';
import {GameService} from './_services/game.service';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';
import {User} from './_models/user';
import {Role} from './_models/role';

// http socket

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PopChess';
  username = 'hi';
  currentUser: string;
  initials;

  constructor(  private router: Router,
                private authService: AuthService,
                private gameSercive: GameService) {

  }

  ngOnInit(): void {
    this.gameSercive.connect();
  }

  get isUser(): string {
      return this.gameSercive.currentUser;
  }

  // isAdmin(): boolean {
  //   return this.currentUser && this.currentUser.role === Role.admin;
  // }
  //
  // isUser(): User {
  //   return this.currentUser;
  // }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
