import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintEngagementComponent } from './print-engagement.component';

describe('PrintEngagementComponent', () => {
  let component: PrintEngagementComponent;
  let fixture: ComponentFixture<PrintEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintEngagementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
