import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {io} from 'socket.io-client';
import {QueueMessage} from '../_models/queueMessage';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../_models/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  socket;

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  connect(): void {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('connect', message => {
      console.log('connected');
    });
  }

  public inQueue(): void {
    this.socket.emit('enterQueue', 'enter queue');
  }
}
