import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodayScreen } from './components/today-screen/today-screen';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodayScreen],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
