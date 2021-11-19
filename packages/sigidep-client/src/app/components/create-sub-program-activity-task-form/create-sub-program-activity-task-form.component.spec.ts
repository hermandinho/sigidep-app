import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubProgramActivityTaskFormComponent } from './create-sub-program-activity-task-form.component';

describe('CreateSubProgramActivityTaskFormComponent', () => {
  let component: CreateSubProgramActivityTaskFormComponent;
  let fixture: ComponentFixture<CreateSubProgramActivityTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSubProgramActivityTaskFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CreateSubProgramActivityTaskFormComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
