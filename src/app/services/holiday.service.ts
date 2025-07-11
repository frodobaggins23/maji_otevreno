import { Injectable } from '@angular/core';
import { Holiday, HolidayStatus } from '../models/holiday.model';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private czechHolidays: Holiday[] = [
    { date: '2025-01-01', name: 'Nový rok', shopsClosed: true },
    { date: '2025-04-18', name: 'Velký pátek', shopsClosed: false },
    { date: '2025-04-21', name: 'Velikonoční pondělí', shopsClosed: true },
    { date: '2025-05-01', name: 'Svátek práce', shopsClosed: true },
    { date: '2025-05-08', name: 'Den vítězství', shopsClosed: false },
    { date: '2025-07-05', name: 'Den slovanských věrozvěstů Cyrila a Metoděje', shopsClosed: false },
    { date: '2025-07-06', name: 'Den upálení mistra Jana Husa', shopsClosed: false },
    { date: '2025-09-28', name: 'Den české státnosti', shopsClosed: false },
    { date: '2025-10-28', name: 'Den vzniku samostatného československého státu', shopsClosed: false },
    { date: '2025-11-17', name: 'Den boje za svobodu a demokracii', shopsClosed: false },
    { date: '2025-12-24', name: 'Štědrý den', shopsClosed: true },
    { date: '2025-12-25', name: '1. svátek vánoční', shopsClosed: true },
    { date: '2025-12-26', name: '2. svátek vánoční', shopsClosed: true }
  ];

  constructor(private timeService: TimeService) {}

  getTodayStatus(): HolidayStatus {
    const todayString = this.timeService.getCurrentDateString();
    const holiday = this.czechHolidays.find(h => h.date === todayString);
    
    return {
      isHoliday: !!holiday,
      holidayName: holiday?.name,
      shopsClosed: holiday?.shopsClosed
    };
  }

  getHolidayByDate(date: Date): Holiday | undefined {
    const dateString = this.timeService.dateToLocalString(date);
    return this.czechHolidays.find(h => h.date === dateString);
  }

  isHoliday(date: Date): boolean {
    const dateString = this.timeService.dateToLocalString(date);
    return this.czechHolidays.some(h => h.date === dateString);
  }

  getAllHolidays(): Holiday[] {
    return [...this.czechHolidays];
  }

  getUpcomingHolidays(limit: number = 3): Holiday[] {
    const todayTimestamp = this.timeService.dateToTimestamp(this.timeService.getCurrentDate());
    
    return this.czechHolidays
      .filter(h => this.timeService.stringToTimestamp(h.date) > todayTimestamp)
      .slice(0, limit);
  }
}