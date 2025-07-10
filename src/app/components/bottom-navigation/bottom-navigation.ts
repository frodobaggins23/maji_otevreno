import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ScreenType = 'today' | 'calendar';

@Component({
  selector: 'app-bottom-navigation',
  imports: [CommonModule],
  templateUrl: './bottom-navigation.html',
  styleUrl: './bottom-navigation.scss'
})
export class BottomNavigation {
  @Input() currentScreen: ScreenType = 'today';
  @Output() screenChange = new EventEmitter<ScreenType>();

  onScreenSelect(screen: ScreenType): void {
    this.screenChange.emit(screen);
  }
}
