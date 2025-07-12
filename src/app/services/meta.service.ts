import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private readonly baseTitle = 'Mají Otevřeno?';
  private readonly baseTitleSuffix = ' - Zjistěte, zda mají obchody otevřeno o svátcích';

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  setTodayPageTitle(holidayName?: string): void {
    let title: string;
    
    if (holidayName) {
      title = `Dnes: ${holidayName} | ${this.baseTitle}`;
    } else {
      title = `Dnes | ${this.baseTitle}`;
    }
    
    this.titleService.setTitle(title);
    this.updateOgTitle(title);
  }

  setCalendarPageTitle(monthYear?: string): void {
    let title: string;
    
    if (monthYear) {
      title = `Kalendář: ${monthYear} | ${this.baseTitle}`;
    } else {
      title = `Kalendář svátků | ${this.baseTitle}`;
    }
    
    this.titleService.setTitle(title);
    this.updateOgTitle(title);
  }

  setDefaultTitle(): void {
    const title = this.baseTitle + this.baseTitleSuffix;
    this.titleService.setTitle(title);
    this.updateOgTitle(title);
  }

  private updateOgTitle(title: string): void {
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
  }
}