import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  
  dateToLocalString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  dateToTimestamp(date: Date): number {
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return dateOnly.getTime();
  }

  stringToTimestamp(dateString: string): number {
    const [year, month, day] = dateString.split('-').map(Number);
    const dateOnly = new Date(year, month - 1, day);
    return dateOnly.getTime();
  }

  getCurrentDate(): Date {
    return new Date();
  }

  getCurrentDateString(): string {
    return this.dateToLocalString(this.getCurrentDate());
  }
}