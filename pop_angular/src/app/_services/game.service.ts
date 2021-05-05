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

  constructor(private http: HttpClient,
              private auth: AuthService,
              private router: Router) { }

  connect(): void {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('connect', message => {
      console.log('connected');
    });
  }

  public inQueue(): void {
    this.socket.emit('enterQueue');
    this.socket.on('message', message => {
      console.log(message);
    });
    this.socket.on('match', () => {
      console.log('match');
      this.router.navigate(['/game']);
    });
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
    this.socket.on('login', message => {
      console.log(message);
      this.router.navigate(['/']);
    });
    this.socket.on('error', message => {
      console.log(message);
    });
  }
}
