import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Piece} from '../_models/piece';

@Component({
  selector: 'app-game-button',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.css']
})
export class GameButtonComponent implements OnInit {
  @Input() piece: Piece;


  constructor() { }

  ngOnInit(): void {
  }

}
