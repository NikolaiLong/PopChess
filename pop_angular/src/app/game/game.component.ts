import { Component, OnInit } from '@angular/core';
import {Piece} from '../_models/piece';
import {GameService} from '../_services/game.service';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  buttons: Piece[] = [{clicked: false, value: -2, col: 0, row: 0}, {clicked: false, value: -3, col: 1, row: 0}, {clicked: false, value: -4, col: 2, row: 0}, {clicked: false, value: -5, col: 3, row: 0},
    {clicked: false, value: -6, col: 4, row: 0}, {clicked: false, value: -4, col: 5, row: 0}, {clicked: false, value: -3, col: 6, row: 0}, {clicked: false, value: -2, col: 7, row: 0},

    {clicked: false, value: -1, col: 0, row: 1}, {clicked: false, value: -1, col: 1, row: 1}, {clicked: false, value: -1, col: 2, row: 1}, {clicked: false, value: -1, col: 3, row: 1},
    {clicked: false, value: -1, col: 4, row: 1}, {clicked: false, value: -1, col: 5, row: 1}, {clicked: false, value: -1, col: 6, row: 1}, {clicked: false, value: -1, col: 7, row: 1},

    {clicked: false, value: 0, col: 0, row: 2}, {clicked: false, value: 0, col: 1, row: 2}, {clicked: false, value: 0, col: 2, row: 2}, {clicked: false, value: 0, col: 3, row: 2},
    {clicked: false, value: 0, col: 4, row: 2}, {clicked: false, value: 0, col: 5, row: 2}, {clicked: false, value: 0, col: 6, row: 2}, {clicked: false, value: 0, col: 7, row: 2},

    {clicked: false, value: 0, col: 0, row: 3}, {clicked: false, value: 0, col: 1, row: 3}, {clicked: false, value: 0, col: 2, row: 3}, {clicked: false, value: 0, col: 3, row: 3},
    {clicked: false, value: 0, col: 4, row: 3}, {clicked: false, value: 0, col: 5, row: 3}, {clicked: false, value: 0, col: 6, row: 3}, {clicked: false, value: 0, col: 7, row: 3},

    {clicked: false, value: 0, col: 0, row: 4}, {clicked: false, value: 0, col: 1, row: 4}, {clicked: false, value: 0, col: 2, row: 4}, {clicked: false, value: 0, col: 3, row: 4},
    {clicked: false, value: 0, col: 4, row: 4}, {clicked: false, value: 0, col: 5, row: 4}, {clicked: false, value: 0, col: 6, row: 4}, {clicked: false, value: 0, col: 7, row: 4},

    {clicked: false, value: 0, col: 0, row: 5}, {clicked: false, value: 0, col: 1, row: 5}, {clicked: false, value: 0, col: 2, row: 5}, {clicked: false, value: 0, col: 3, row: 5},
    {clicked: false, value: 0, col: 4, row: 5}, {clicked: false, value: 0, col: 5, row: 5}, {clicked: false, value: 0, col: 6, row: 5}, {clicked: false, value: 0, col: 7, row: 5},

    {clicked: false, value: 1, col: 0, row: 6}, {clicked: false, value: 1, col: 1, row: 6}, {clicked: false, value: 1, col: 2, row: 6}, {clicked: false, value: 1, col: 3, row: 6},
    {clicked: false, value: 1, col: 4, row: 6}, {clicked: false, value: 1, col: 5, row: 6}, {clicked: false, value: 1, col: 6, row: 6}, {clicked: false, value: 1, col: 7, row: 6},

    {clicked: false, value: 2, col: 0, row: 7}, {clicked: false, value: 3, col: 1, row: 7}, {clicked: false, value: 4, col: 2, row: 7}, {clicked: false, value: 5, col: 3, row: 7},
    {clicked: false, value: 6, col: 4, row: 7}, {clicked: false, value: 4, col: 5, row: 7}, {clicked: false, value: 3, col: 6, row: 7}, {clicked: false, value: 2, col: 7, row: 7}];

  constructor(
    private gameService: GameService,
    private notifService: NotificationService,
  ) { }

  async ngOnInit(): Promise<any> {
    await this.gameService.getUser();
    await this.updateBoard();
  }

  async sendMove(): Promise<any> {
    console.log('sending move');
    const pieces: number[] = [];
    let count = 0;
    for (let i = 0; i < 64; i++) {
      if (this.buttons[i].clicked) {
        pieces[count] = i;
        count++;
      }
    }
    if (count !== 2) {
      this.notifService.showNotif('error: select two spaces to make a move');
      return;
    }
    await this.gameService.sendMove(pieces);
    this.buttons[pieces[0]].clicked = false;
    this.buttons[pieces[1]].clicked = false;
    await this.updateBoard();
  }

  async updateBoard(): Promise<any> {
    console.log('updating board');
    await this.gameService.getBoard();
    const board = this.gameService.board;
    for (let i = 0; i < 64; i++) {
      this.buttons[i].value = board[i];
    }
    const container = document.getElementById('board');
    const content = container.innerHTML;
    container.innerHTML = content;
  }
}
