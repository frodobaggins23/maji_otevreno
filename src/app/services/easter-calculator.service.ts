import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EasterCalculatorService {

  /**
   * Calculates Easter Sunday date using the Gregorian calendar algorithm
   * Based on the algorithm by Jean Meeus
   */
  calculateEasterSunday(year: number): Date {
    // Golden number - position of the year in the 19-year Metonic cycle
    const goldenNumber = year % 19;
    
    // Century index (not the human-readable century number)
    // For 2025: centuryIndex = 20 (used in calculations, not display)
    const centuryIndex = Math.floor(year / 100);
    const yearInCentury = year % 100;
    
    // Leap year adjustments for century
    const centuryLeapAdjustment = Math.floor(centuryIndex / 4);
    const centuryRemainder = centuryIndex % 4;
    
    // Gregorian calendar correction
    const gregorianCorrection = Math.floor((centuryIndex + 8) / 25);
    const lunarCorrection = Math.floor((centuryIndex - gregorianCorrection + 1) / 3);
    
    // Easter calculation step - finds the calendar date of the Paschal full moon
    const paschalFullMoon = (19 * goldenNumber + centuryIndex - centuryLeapAdjustment - lunarCorrection + 15) % 30;
    
    // Leap year adjustments for year within century
    const yearLeapAdjustment = Math.floor(yearInCentury / 4);
    const yearRemainder = yearInCentury % 4;
    
    // Calculate the day of the week for the Paschal full moon
    const weekdayAdjustment = (32 + 2 * centuryRemainder + 2 * yearLeapAdjustment - paschalFullMoon - yearRemainder) % 7;
    
    // Special case adjustment for certain years
    const specialCaseAdjustment = Math.floor((goldenNumber + 11 * paschalFullMoon + 22 * weekdayAdjustment) / 451);
    
    // Calculate the month (1-12)
    const easterMonth = Math.floor((paschalFullMoon + weekdayAdjustment - 7 * specialCaseAdjustment + 114) / 31);
    
    // Calculate the day of the month
    const easterDay = ((paschalFullMoon + weekdayAdjustment - 7 * specialCaseAdjustment + 114) % 31) + 1;
    
    return new Date(year, easterMonth - 1, easterDay);
  }

  /**
   * Calculates Good Friday (2 days before Easter Sunday)
   */
  calculateGoodFriday(year: number): Date {
    const easterSunday = this.calculateEasterSunday(year);
    const goodFriday = new Date(easterSunday);
    goodFriday.setDate(easterSunday.getDate() - 2);
    return goodFriday;
  }

  /**
   * Calculates Easter Monday (1 day after Easter Sunday)
   */
  calculateEasterMonday(year: number): Date {
    const easterSunday = this.calculateEasterSunday(year);
    const easterMonday = new Date(easterSunday);
    easterMonday.setDate(easterSunday.getDate() + 1);
    return easterMonday;
  }
}