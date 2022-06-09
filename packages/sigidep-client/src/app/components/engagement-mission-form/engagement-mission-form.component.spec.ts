import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementMissionFormComponent } from './engagement-mission-form.component';

describe('EngagementMissionFormComponent', () => {
  let component: EngagementMissionFormComponent;
  let fixture: ComponentFixture<EngagementMissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EngagementMissionFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementMissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
