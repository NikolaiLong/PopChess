import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Piece} from '../_models/piece';

@Component({
  selector: 'app-game-button',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.css']
})
export class GameButtonComponent implements OnInit {
  @Input() piece: Piece;

  color: string;
  base: string;
  icon: string;
  iconColor: string;
  iconFont: string;

  constructor() { }

  ngOnInit(): void {
    if ((this.piece.col + this.piece.row) % 2 === 0) {
      this.color = 'white';
    } else {
      this.color = 'black';
    }
    this.base = this.color;
    this.chooseIcon();
  }

  clicked(): void {
    if (this.piece.clicked) {
      this.color = this.base;
      this.piece.clicked = false;
    } else {
      this.color = '#F0E68C';
      this.piece.clicked = true;
    }
  }

  chooseIcon(): void {
    if (this.piece.value < 0){
      this.iconColor = '#9400D3';
    } else {
      this.iconColor = '#87CEEB';
    }
    switch (this.piece.value) {
      case 0:
        this.icon = '';
        this.iconFont = '';
        break;
      case 1: case -1:
        this.icon = 'arrow_upward';
        this.iconFont = '25px';
        break;
      case 2: case -2:
        this.icon = 'cake';
        this.iconFont = '35px';
        break;
      case 3: case -3:
        this.icon = 'child_friendly';
        this.iconFont = '35px';
        break;
      case 4: case -4:
        this.icon = 'person_add';
        this.iconFont = '35px';
        break;
      case 5: case -5:
        this.icon = 'power';
        this.iconFont = '45px';
        break;
      case 6: case -6:
        this.icon = 'android';
        this.iconFont = '45px';
        break;
    }
  }

}
