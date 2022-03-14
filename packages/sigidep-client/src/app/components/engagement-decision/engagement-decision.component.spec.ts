import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementDecisionComponent } from './engagement-decision.component';

describe('EngagementDecisionComponent', () => {
  let component: EngagementDecisionComponent;
  let fixture: ComponentFixture<EngagementDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EngagementDecisionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
