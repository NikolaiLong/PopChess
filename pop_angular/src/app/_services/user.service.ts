import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import { io } from 'socket.io-client';
import {environment} from '../_models/environment';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) { }

  // getAll() {
  //   return this.http.get<User[]>(`http://localhost:3030/user/allusers`);
  // }

  register(user: any): Observable<any> {
    console.log(user);
    return this.http.post(`http://localhost:3030/user/register`, user);
  }

  // setGoals(cal: number, min: number) {
  //   const user: string = this.auth.currentUserValue().username;
  //   const goal = {
  //     caloriegoal: cal,
  //     minutegoal: min,
  //     username: user
  //   };
  //   return this.http.post(`http://localhost:3030/user/setgoals`, goal);
  // }

  // getGoals(id: string) {
  //   return this.http.get<any>(`http://localhost:3030/user/getgoals/:username` + id);
  // }

  // logInLoad() {
  //
  //   location.reload();
  // }
}
