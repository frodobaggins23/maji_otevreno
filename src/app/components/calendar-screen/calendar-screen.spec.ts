import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarScreen } from './calendar-screen';

describe('CalendarScreen', () => {
  let component: CalendarScreen;
  let fixture: ComponentFixture<CalendarScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
