import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BottomNavigation } from './components/bottom-navigation/bottom-navigation';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, BottomNavigation],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
