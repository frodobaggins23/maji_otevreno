import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayScreen } from './today-screen';

describe('TodayScreen', () => {
  let component: TodayScreen;
  let fixture: ComponentFixture<TodayScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
