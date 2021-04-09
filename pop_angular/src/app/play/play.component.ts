import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  time = 1;
  increment = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
