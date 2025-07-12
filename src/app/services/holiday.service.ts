import { Injectable } from '@angular/core';
import { Holiday, HolidayStatus } from '../models/holiday.model';
import { TimeService } from './time.service';
import { HolidayGeneratorService } from './holiday-generator.service';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(
    private timeService: TimeService,
    private holidayGenerator: HolidayGeneratorService
  ) {}

  getTodayStatus(): HolidayStatus {
    const today = this.timeService.getCurrentDate();
    const holiday = this.getHolidayByDate(today);
    
    return {
      isHoliday: !!holiday,
      holidayName: holiday?.name,
      shopsClosed: holiday?.shopsClosed
    };
  }

  getHolidayByDate(date: Date): Holiday | undefined {
    const dateString = this.timeService.dateToLocalString(date);
    const holidays = this.getHolidaysForYear(date.getFullYear());
    return holidays.find(h => h.date === dateString);
  }

  isHoliday(date: Date): boolean {
    const dateString = this.timeService.dateToLocalString(date);
    const holidays = this.getHolidaysForYear(date.getFullYear());
    return holidays.some(h => h.date === dateString);
  }

  getAllHolidays(): Holiday[] {
    const currentYear = this.timeService.getCurrentDate().getFullYear();
    return this.getHolidaysForYear(currentYear);
  }

  getHolidaysForYear(year: number): Holiday[] {
    return this.holidayGenerator.generateHolidaysForYear(year);
  }

  getUpcomingHolidays(limit: number = 3): Holiday[] {
    const today = this.timeService.getCurrentDate();
    const todayTimestamp = this.timeService.dateToTimestamp(today);
    const currentYear = today.getFullYear();
    
    // Get holidays from previous, current and next year for seamless transitions
    const previousYearHolidays = this.getHolidaysForYear(currentYear - 1);
    const currentYearHolidays = this.getHolidaysForYear(currentYear);
    const nextYearHolidays = this.getHolidaysForYear(currentYear + 1);
    const allHolidays = [...previousYearHolidays, ...currentYearHolidays, ...nextYearHolidays];
    
    return allHolidays
      .filter(h => this.timeService.stringToTimestamp(h.date) > todayTimestamp)
      .slice(0, limit);
  }
}