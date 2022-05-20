import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintEngagementMandatPrimeComponent } from './print-engagement-mandat-prime.component';

describe('PrintEngagementMandatPrimeComponent', () => {
  let component: PrintEngagementMandatPrimeComponent;
  let fixture: ComponentFixture<PrintEngagementMandatPrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintEngagementMandatPrimeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintEngagementMandatPrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
