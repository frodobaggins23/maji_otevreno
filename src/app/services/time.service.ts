import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  
  dateToISOString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  dateToTimestamp(date: Date): number {
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return dateOnly.getTime();
  }

  stringToTimestamp(dateString: string): number {
    return new Date(dateString).getTime();
  }

  getCurrentDate(): Date {
    return new Date();
  }

  getCurrentDateString(): string {
    return this.dateToISOString(this.getCurrentDate());
  }
}