import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodayScreen } from './components/today-screen/today-screen';
import { CalendarScreen } from './components/calendar-screen/calendar-screen';
import { BottomNavigation, ScreenType } from './components/bottom-navigation/bottom-navigation';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, TodayScreen, CalendarScreen, BottomNavigation],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  currentScreen: ScreenType = 'today';

  onScreenChange(screen: ScreenType): void {
    this.currentScreen = screen;
  }
}
