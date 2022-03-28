import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationEngagementComponent } from './reservation-engagement.component';

describe('ReservationEngagementComponent', () => {
  let component: ReservationEngagementComponent;
  let fixture: ComponentFixture<ReservationEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationEngagementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
