export interface Holiday {
  date: string; // ISO format (YYYY-MM-DD)
  name: string; // Czech name
}

export interface HolidayStatus {
  isHoliday: boolean;
  holidayName?: string;
}