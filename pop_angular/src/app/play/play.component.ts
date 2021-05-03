import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../_services/auth.service';
@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  time = 1;
  increment = 0;

  inQueue: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.inQueue = this.authService.currentUserValue().inQueue;
  }

  queue(time: number, inc: number): void {
    if ( time !== -1){
      this.time = time;
      this.increment = inc;
    }
    this.inQueue = true;
    // this.authService.currentUserValue().inQueue = true;
  }

}
