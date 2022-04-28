import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementMissionComponent } from './engagement-mission.component';

describe('EngagementMissionComponent', () => {
  let component: EngagementMissionComponent;
  let fixture: ComponentFixture<EngagementMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EngagementMissionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
