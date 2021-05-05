import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NotificationService } from '../_services/notification.service';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import {GameService} from '../_services/game.service';

@Component({templateUrl: 'register.component.html',

  styleUrls: ['register.component.css']

})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  roles = [];


  constructor(
    // private patternValidator: PatternValidator,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private notification: NotificationService,
    private gameService: GameService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    console.log('hello world');
    this.registerForm = this.formBuilder.group({
      role: [''],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });

    this.roles = [{name: 'User'},
      {name: 'Admin'}];
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }

    this.gameService.register(this.registerForm.value);

    // this.loading = true;
    // this.userService.register(this.registerForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       // this.alertService.success('Registration successful', true);
    //       this.router.navigate(['/login']);
    //     },
    //     error => {
    //       console.log('Error:', error);
    //       this.notification.showNotif(error);
    //       this.loading = false;
    //     });
  }
}
