export interface Holiday {
  date: string; // ISO format (YYYY-MM-DD)
  name: string; // Czech name
  shopsClosed: boolean; // Whether shops are generally closed on this holiday
}

export interface HolidayStatus {
  isHoliday: boolean;
  holidayName?: string;
  shopsClosed?: boolean;
}