import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {io} from 'socket.io-client';
import {QueueMessage} from '../_models/queueMessage';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../_models/environment';
import {Router} from '@angular/router';
import {User} from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  socket;
  currentUser;
  board;

  match = false;
  moved;

  constructor(private http: HttpClient,
              private auth: AuthService,
              private router: Router) { }

  public connect(): void {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('connect', message => {
      console.log('connected');
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    });
  }

  public canActivate(): boolean {
    if (this.currentUser === null) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  public startGame(): void {
    const board = JSON.parse(localStorage.getItem('board'));
    if (board !== null) {
      this.board = board;
    } else {
      this.board =
        [-2, -3, -4, -5, -6, -4, -3, -2,
          -1, -1, -1, -1, -1, -1, -1, -1,
          0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0,
          1, 1, 1, 1, 1, 1, 1, 1,
          2, 3, 4, 5, 6, 4, 3, 2];
    }
  }

  public inQueue(): void {
    localStorage.setItem('queue', 'true');
    this.socket.emit('enterQueue', this.currentUser.username);
    this.socket.on('message', message => {
      console.log(message);
    });
    this.socket.on('match', () => {
      this.match = true;
      console.log('match');
      localStorage.setItem('queue', 'false');
      this.router.navigate(['/game']);
    });
    setTimeout(() => {
      if (!this.match) {
        const timer = setInterval(() => {
          this.socket.emit('getUser', this.currentUser.username);
          this.socket.on('gotUser', user => {
            this.currentUser = user[0];
            localStorage.setItem('user', JSON.stringify(user[0]));
          });
          if (this.currentUser.gameID !== -1) {
            localStorage.setItem('queue', 'false');
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
      localStorage.setItem('user', JSON.stringify(user));
      console.log(this.currentUser);
      this.router.navigate(['/']);
    });
    this.socket.on('error', message => {
      console.log(message);
    });
  }

  public logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
    localStorage.removeItem('queue');
    localStorage.removeItem('board');
  }

  public async getUser(): Promise<any> {
    this.socket.emit('getUser', JSON.parse(localStorage.getItem('user')).username);
    return new Promise<any>((resolve, reject) => {
      this.socket.on('gotUser', user => {
        this.currentUser = user[0];
        localStorage.setItem('user', JSON.stringify(user[0]));
      });
    });
  }

  public async getBoard(): Promise<any> {
    this.socket.emit('getBoard', this.currentUser.gameID);
    return new Promise<any>((resolve, reject) => {
      this.socket.on('gotBoard', board => {
        this.board = board;
        console.log(board);
        localStorage.setItem('board', JSON.stringify(board));
        return resolve(this.board);
      });
    });
  }

  public sendMove(pieces: number[]): void {
    this.moved = false;
    this.socket.emit('sendMove', {id: this.currentUser.gameID, piece: pieces});
    this.socket.on('gotMove', () => {
      this.moved = true;
    });
  }
}
