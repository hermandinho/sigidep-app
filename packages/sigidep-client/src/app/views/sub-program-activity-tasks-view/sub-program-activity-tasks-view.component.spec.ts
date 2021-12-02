import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProgramActivityTasksViewComponent } from './sub-program-activity-tasks-view.component';

describe('SubProgramActivityTasksViewComponent', () => {
  let component: SubProgramActivityTasksViewComponent;
  let fixture: ComponentFixture<SubProgramActivityTasksViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubProgramActivityTasksViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProgramActivityTasksViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
