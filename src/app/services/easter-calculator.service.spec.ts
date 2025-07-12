import { TestBed } from '@angular/core/testing';
import { EasterCalculatorService } from './easter-calculator.service';

describe('EasterCalculatorService', () => {
  let service: EasterCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EasterCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculateEasterSunday', () => {
    it('should calculate correct Easter dates for known years', () => {
      const knownEasterDates = [
        { year: 2023, month: 3, day: 9 }, // April 9, 2023
        { year: 2024, month: 2, day: 31 }, // March 31, 2024
        { year: 2025, month: 3, day: 20 }, // April 20, 2025
        { year: 2026, month: 3, day: 5 }, // April 5, 2026
        { year: 2027, month: 2, day: 28 }, // March 28, 2027
        { year: 2030, month: 3, day: 21 } // April 21, 2030
      ];

      knownEasterDates.forEach(({ year, month, day }) => {
        const easter = service.calculateEasterSunday(year);
        expect(easter.getFullYear()).toBe(year);
        expect(easter.getMonth()).toBe(month);
        expect(easter.getDate()).toBe(day);
      });
    });

    it('should always return a Sunday', () => {
      const testYears = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
      
      testYears.forEach(year => {
        const easter = service.calculateEasterSunday(year);
        expect(easter.getDay()).toBe(0, `Easter ${year} should be on Sunday`);
      });
    });

    it('should return dates between March 22 and April 25', () => {
      const testYears = Array.from({ length: 50 }, (_, i) => 2000 + i);
      
      testYears.forEach(year => {
        const easter = service.calculateEasterSunday(year);
        const month = easter.getMonth();
        const day = easter.getDate();
        
        const isValidRange = (month === 2 && day >= 22) || (month === 3 && day <= 25);
        expect(isValidRange).toBe(true, `Easter ${year} should be between March 22 and April 25`);
      });
    });
  });

  describe('calculateGoodFriday', () => {
    it('should return Friday 2 days before Easter', () => {
      const testYears = [2023, 2024, 2025, 2026, 2027];
      
      testYears.forEach(year => {
        const easter = service.calculateEasterSunday(year);
        const goodFriday = service.calculateGoodFriday(year);
        
        expect(goodFriday.getDay()).toBe(5, `Good Friday ${year} should be on Friday`);
        
        // Use UTC dates to avoid timezone issues
        const easterUTC = new Date(easter.getFullYear(), easter.getMonth(), easter.getDate());
        const goodFridayUTC = new Date(goodFriday.getFullYear(), goodFriday.getMonth(), goodFriday.getDate());
        const daysDifference = Math.round((easterUTC.getTime() - goodFridayUTC.getTime()) / (1000 * 60 * 60 * 24));
        expect(daysDifference).toBe(2, `Good Friday ${year} should be 2 days before Easter`);
      });
    });
  });

  describe('calculateEasterMonday', () => {
    it('should return Monday 1 day after Easter', () => {
      const testYears = [2023, 2024, 2025, 2026, 2027];
      
      testYears.forEach(year => {
        const easter = service.calculateEasterSunday(year);
        const easterMonday = service.calculateEasterMonday(year);
        
        expect(easterMonday.getDay()).toBe(1, `Easter Monday ${year} should be on Monday`);
        
        // Use UTC dates to avoid timezone issues
        const easterUTC = new Date(easter.getFullYear(), easter.getMonth(), easter.getDate());
        const easterMondayUTC = new Date(easterMonday.getFullYear(), easterMonday.getMonth(), easterMonday.getDate());
        const daysDifference = Math.round((easterMondayUTC.getTime() - easterUTC.getTime()) / (1000 * 60 * 60 * 24));
        expect(daysDifference).toBe(1, `Easter Monday ${year} should be 1 day after Easter`);
      });
    });
  });
});