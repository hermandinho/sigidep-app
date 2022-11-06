import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationBonEngagementComponent } from './reservation-bon-engagement.component';

describe('ReservationBonEngagementComponent', () => {
  let component: ReservationBonEngagementComponent;
  let fixture: ComponentFixture<ReservationBonEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationBonEngagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationBonEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
