import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayService } from '../../services/holiday.service';
import { TimeService } from '../../services/time.service';
import { MetaService } from '../../services/meta.service';
import { HolidayStatus } from '../../models/holiday.model';
import { ShopCategory } from '../../models/shop.model';

// Constants for Czech day and month names
const CZECH_DAY_NAMES = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
const CZECH_MONTH_NAMES = [
  'ledna', 'února', 'března', 'dubna', 'května', 'června',
  'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'
];

// Shop categories configuration
const SHOP_CATEGORIES: ShopCategory[] = [
  { name: 'Lékárny (pohotovostní služba)', isOpenOnHolidays: true, icon: '✓' },
  { name: 'Benzínové pumpy', isOpenOnHolidays: true, icon: '✓' },
  { name: 'Vybrané potraviny (Tesco, Albert)', isOpenOnHolidays: true, icon: '✓' },
  { name: 'Supermarkety (Billa, Kaufland)', isOpenOnHolidays: false, icon: '✕' },
  { name: 'Obchodní centra', isOpenOnHolidays: false, icon: '✕' },
  { name: 'Banky a pošty', isOpenOnHolidays: false, icon: '✕' }
];

@Component({
  selector: 'app-today-screen',
  imports: [CommonModule],
  templateUrl: './today-screen.html',
  styleUrl: './today-screen.scss'
})
export class TodayScreen implements OnInit {
  todayStatus: HolidayStatus = { isHoliday: false };
  todayDateString: string = '';
  shopCategories: ShopCategory[] = SHOP_CATEGORIES;

  constructor(
    private holidayService: HolidayService,
    private timeService: TimeService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.todayStatus = this.holidayService.getTodayStatus();
    this.todayDateString = this.formatCurrentDate();
    
    this.metaService.setTodayPageTitle(this.todayStatus.holidayName);
  }

  private formatCurrentDate(): string {
    const today = this.timeService.getCurrentDate();
    const dayName = CZECH_DAY_NAMES[today.getDay()];
    const day = today.getDate();
    const month = CZECH_MONTH_NAMES[today.getMonth()];
    const year = today.getFullYear();

    return `${dayName}, ${day}. ${month} ${year}`;
  }

  getStatusText(): string {
    if (this.todayStatus.isHoliday && this.todayStatus.shopsClosed) {
      return $localize`:@@status.closed:ZAVŘENO`;
    } else {
      return $localize`:@@status.open:OTEVŘENO`;
    }
  }

  getStatusIcon(): string {
    if (this.todayStatus.isHoliday && this.todayStatus.shopsClosed) {
      return '✕';
    } else {
      return '✓';
    }
  }

  getStatusDescription(): string {
    if (this.todayStatus.isHoliday && this.todayStatus.shopsClosed) {
      return $localize`:@@status.closed.description:Dnes jsou obchody zavřené`;
    } else {
      return $localize`:@@status.open.description:Dnes mají obchody otevřeno`;
    }
  }

  getShopsByStatus(isOpen: boolean): ShopCategory[] {
    return this.shopCategories.filter(shop => {
      if (this.todayStatus.isHoliday && this.todayStatus.shopsClosed) {
        return shop.isOpenOnHolidays === isOpen;
      } else {
        return isOpen;
      }
    });
  }
}
