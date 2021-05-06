import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {io} from 'socket.io-client';
import {QueueMessage} from '../_models/queueMessage';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../_models/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  socket;
  currentUser;
  match = false;

  constructor(private http: HttpClient,
              private auth: AuthService,
              private router: Router) {
    this.currentUser = null;
  }

  public connect(): void {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('connect', message => {
      console.log('connected');
    });
  }

  public canActivate(): boolean {
    if (this.currentUser === null) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  public inQueue(): void {
    this.socket.emit('enterQueue', this.currentUser.username);
    this.socket.on('message', message => {
      console.log(message);
    });
    this.socket.on('match', () => {
      this.match = true;
      console.log('match');
      this.router.navigate(['/game']);
    });
    setTimeout(() => {
      if (!this.match) {
        const timer = setInterval(() => {
          this.socket.emit('getUser', this.currentUser.username);
          this.socket.on('gotUser', user => {
            this.currentUser = user[0];
          });
          if (this.currentUser.gameID !== -1) {
            this.router.navigate(['/game']);
            clearInterval(timer);
          }
        }, 500);
      }
    }, 2000);
  }

  public register(user: any): void {
    this.socket.emit('register', user);
    this.socket.on('register', message => {
      console.log(message);
      this.router.navigate(['/login']);
    });
    this.socket.on('error', message => {
      console.log(message);
    });
  }

  public login(body: any): void {
    this.socket.emit('login', body);
    this.socket.on('login', user => {
      this.currentUser = user;
      console.log(this.currentUser);
      this.router.navigate(['/']);
    });
    this.socket.on('error', message => {
      console.log(message);
    });
  }

  public logout(): void {
    this.currentUser = null;
  }

  public getUser(): any {
    console.log('get user:');
    console.log(this.currentUser[0]);
    this.socket.emit('getUser', this.currentUser.username);
    this.socket.on('gotUser', user => {
      this.currentUser = user[0];
      console.log('curr user:');
      console.log(this.currentUser);
    });
  }

  public async getBoard(): Promise<any> {
    console.log('this.currentUser.gameID', this.currentUser.gameID);
    this.socket.emit('getBoard', this.currentUser.gameID);
    this.socket.on('gotBoard', board => {
      console.log('got boards');
      console.log(board);
      // return board;
      return new Promise(board);
    });
  }
}
