import { Routes } from '@angular/router';
import { TodayScreen } from './components/today-screen/today-screen';
import { CalendarScreen } from './components/calendar-screen/calendar-screen';

export const routes: Routes = [
  { path: '', redirectTo: '/today', pathMatch: 'full' },
  { 
    path: 'today', 
    component: TodayScreen,
    title: 'Dnes - Mají Otevřeno?',
    data: { 
      description: 'Zjistěte, zda mají dnes obchody otevřeno. Aktuální informace o svátcích a otevírací době.',
      keywords: 'dnes, otevřeno, svátek, obchody, otevírací doba'
    }
  },
  { 
    path: 'calendar', 
    component: CalendarScreen,
    title: 'Kalendář svátků - Mají Otevřeno?',
    data: { 
      description: 'Přehledný kalendář všech českých státních svátků s informacemi o otevírací době obchodů.',
      keywords: 'kalendář, svátky, státní svátky, Česká republika, otevírací doba'
    }
  }
];
