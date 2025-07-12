import { Injectable } from '@angular/core';
import { Holiday } from '../models/holiday.model';
import { EasterCalculatorService } from './easter-calculator.service';

interface FixedHoliday {
  month: number;
  day: number;
  name: string;
  shopsClosed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HolidayGeneratorService {
  private readonly CACHE_KEY_PREFIX = 'czech_holidays_';
  
  private fixedHolidays: FixedHoliday[] = [
    { month: 1, day: 1, name: 'Nový rok', shopsClosed: true },
    { month: 5, day: 1, name: 'Svátek práce', shopsClosed: true },
    { month: 5, day: 8, name: 'Den vítězství', shopsClosed: false },
    { month: 7, day: 5, name: 'Den slovanských věrozvěstů Cyrila a Metoděje', shopsClosed: false },
    { month: 7, day: 6, name: 'Den upálení mistra Jana Husa', shopsClosed: false },
    { month: 9, day: 28, name: 'Den české státnosti', shopsClosed: false },
    { month: 10, day: 28, name: 'Den vzniku samostatného československého státu', shopsClosed: false },
    { month: 11, day: 17, name: 'Den boje za svobodu a demokracii', shopsClosed: false },
    { month: 12, day: 24, name: 'Štědrý den', shopsClosed: true },
    { month: 12, day: 25, name: '1. svátek vánoční', shopsClosed: true },
    { month: 12, day: 26, name: '2. svátek vánoční', shopsClosed: true }
  ];

  constructor(private easterCalculator: EasterCalculatorService) {}

  generateHolidaysForYear(year: number): Holiday[] {
    const cacheKey = `${this.CACHE_KEY_PREFIX}${year}`;
    
    try {
      const cachedHolidays = localStorage.getItem(cacheKey);
      if (cachedHolidays) {
        return JSON.parse(cachedHolidays) as Holiday[];
      }
    } catch (error) {
      console.warn('Failed to read holidays from localStorage:', error);
    }

    const holidays = this.calculateHolidaysForYear(year);
    
    try {
      localStorage.setItem(cacheKey, JSON.stringify(holidays));
    } catch (error) {
      console.warn('Failed to save holidays to localStorage:', error);
    }

    return holidays;
  }

  private calculateHolidaysForYear(year: number): Holiday[] {
    const holidays: Holiday[] = [];

    // Add fixed holidays
    for (const fixedHoliday of this.fixedHolidays) {
      holidays.push({
        date: this.formatDate(year, fixedHoliday.month, fixedHoliday.day),
        name: fixedHoliday.name,
        shopsClosed: fixedHoliday.shopsClosed
      });
    }

    // Add Easter-based holidays
    const goodFriday = this.easterCalculator.calculateGoodFriday(year);
    holidays.push({
      date: this.formatDateFromDate(goodFriday),
      name: 'Velký pátek',
      shopsClosed: false
    });

    const easterMonday = this.easterCalculator.calculateEasterMonday(year);
    holidays.push({
      date: this.formatDateFromDate(easterMonday),
      name: 'Velikonoční pondělí',
      shopsClosed: true
    });

    // Sort holidays by date
    holidays.sort((a, b) => a.date.localeCompare(b.date));

    return holidays;
  }

  private formatDate(year: number, month: number, day: number): string {
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  private formatDateFromDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return this.formatDate(year, month, day);
  }
}