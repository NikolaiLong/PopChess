import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameService} from '../_services/game.service';
import {QueueMessage} from '../_models/queueMessage';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  @Input() time: number;
  @Input() increment: number;

  constructor(private gameService: GameService,
              private authService: AuthService,
              private router: Router,
              private notifService: NotificationService) { }

  ngOnInit(): void {
    const user = this.authService.currentUserValue();
    this.gameService.inQueue();
  }
}
