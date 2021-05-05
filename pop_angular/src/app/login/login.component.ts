import { Component, OnInit } from '@angular/core';
import {delay, first} from 'rxjs/operators';
import { Location } from '@angular/common';


import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../_services/notification.service';
import {UserService} from '../_services/user.service';
import {GameService} from '../_services/game.service';


@Component({ templateUrl: 'login.component.html' ,
  styleUrls: ['login.component.css']})
export class LoginComponent {
  // loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  username: string;
  password: string;

  constructor(
    // private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notif: NotificationService,
    private userService: UserService,
    private location: Location,
    private gameService: GameService,
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue()) {
      this.router.navigate(['/']);
    }
  }

  login(): void {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }



    this.loading = true;
    this.gameService.login({username: this.username, password: this.password});

    // this.loading = true;
    // this.authService.login(this.username, this.password)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.location.replaceState('', '', null);
    //       this.userService.logInLoad();
    //
    //       this.notif.showNotif('Logged in as: ' + this.username, 'confirmation');
    //     },
    //     error => {
    //       this.error = error;
    //       this.loading = false;
    //       // show a snackbar to user
    //       this.notif.showNotif(this.error, 'dismiss');
    //       console.log('Error', error);
    //     });
  }

  register() {
    console.log('trying to register');
    this.notif.notImplementedWarning('Registration', 500);
  }
}


