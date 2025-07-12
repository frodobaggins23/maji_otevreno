import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayService } from '../../services/holiday.service';
import { TimeService } from '../../services/time.service';
import { MetaService } from '../../services/meta.service';
import { Holiday } from '../../models/holiday.model';

// Constants for Czech month and day names
const CZECH_MONTH_NAMES = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
];

const CZECH_DAY_HEADERS = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];

interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isHoliday: boolean;
  holidayName?: string;
  shopsClosed?: boolean;
}

@Component({
  selector: 'app-calendar-screen',
  imports: [CommonModule],
  templateUrl: './calendar-screen.html',
  styleUrl: './calendar-screen.scss'
})
export class CalendarScreen implements OnInit {
  currentDate: Date = new Date();
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  
  calendarDays: CalendarDay[] = [];
  dayHeaders: string[] = CZECH_DAY_HEADERS;
  upcomingHolidays: Holiday[] = [];

  constructor(
    private holidayService: HolidayService,
    private timeService: TimeService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.generateCalendar();
    this.loadUpcomingHolidays();
    this.updatePageTitle();
  }

  get currentMonthName(): string {
    return `${CZECH_MONTH_NAMES[this.currentMonth]} ${this.currentYear}`;
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
    this.updatePageTitle();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
    this.updatePageTitle();
  }

  private generateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    
    // Get first Monday of the calendar grid
    const startDate = new Date(firstDay);
    const dayOfWeek = firstDay.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startDate.setDate(startDate.getDate() - daysToSubtract);
    
    // Generate 42 days (6 weeks)
    this.calendarDays = [];
    const today = this.timeService.getCurrentDate();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === this.currentMonth;
      const isToday = this.isSameDay(date, today);
      const holiday = this.holidayService.getHolidayByDate(date);
      
      this.calendarDays.push({
        date: date,
        dayNumber: date.getDate(),
        isCurrentMonth: isCurrentMonth,
        isToday: isToday,
        isHoliday: !!holiday,
        holidayName: holiday?.name,
        shopsClosed: holiday?.shopsClosed
      });
    }
  }

  private loadUpcomingHolidays(): void {
    this.upcomingHolidays = this.holidayService.getUpcomingHolidays(5);
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  formatHolidayDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}.${month}.`;
  }

  private updatePageTitle(): void {
    this.metaService.setCalendarPageTitle(this.currentMonthName);
  }
}
