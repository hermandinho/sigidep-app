import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProgramActivitiesViewComponent } from './sub-program-activities-view.component';

describe('SubProgramActivitiesViewComponent', () => {
  let component: SubProgramActivitiesViewComponent;
  let fixture: ComponentFixture<SubProgramActivitiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubProgramActivitiesViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProgramActivitiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
