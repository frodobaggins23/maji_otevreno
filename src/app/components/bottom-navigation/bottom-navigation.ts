import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

export type ScreenType = 'today' | 'calendar';

@Component({
  selector: 'app-bottom-navigation',
  imports: [CommonModule, RouterModule],
  templateUrl: './bottom-navigation.html',
  styleUrl: './bottom-navigation.scss'
})
export class BottomNavigation {
  currentScreen: ScreenType = 'today';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentScreen = event.url.includes('/calendar') ? 'calendar' : 'today';
      });
  }

  onScreenSelect(screen: ScreenType): void {
    this.router.navigate([`/${screen}`]);
  }
}
