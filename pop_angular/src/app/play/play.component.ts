import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {GameService} from '../_services/game.service';
@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  time = 1;
  increment = 0;

  inQueue: boolean;

  constructor(private authService: AuthService,
              private gameService: GameService,) { }

  async ngOnInit(): Promise<any> {
    await this.gameService.getUser();
    this.inQueue = this.gameService.currentUser.inQueue;
  }

  queue(time: number, inc: number): void {
    if ( time !== -1){
      this.time = time;
      this.increment = inc;
    }
    this.gameService.inQueue();
    const stringQ = localStorage.getItem('queue');
    if (stringQ === 'true') {
      this.inQueue = true;
    } else {
      this.inQueue = false;
    }
  }

}
