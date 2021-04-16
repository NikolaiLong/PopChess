import { Component, OnInit } from '@angular/core';
import {Piece} from '../_models/piece';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  buttons: Piece[] = [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0},
    {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0},
    {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0},
    {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0},
    {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0},
    {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0},
    {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0},
    {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}];

  constructor() { }

  ngOnInit(): void {
  }

}
