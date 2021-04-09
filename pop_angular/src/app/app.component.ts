import { Component } from '@angular/core';
import * as coercion from '@angular/cdk/coercion';
import * as keycodes from '@angular/cdk/keycodes';

// http socket

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PopChess';
  username = 'hi';
}
