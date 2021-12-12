import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubProgramActivityTaskOperationFormComponent } from './create-sub-program-activity-task-operation-form.component';

describe('CreateSubProgramActivityTaskOperationFormComponent', () => {
  let component: CreateSubProgramActivityTaskOperationFormComponent;
  let fixture: ComponentFixture<CreateSubProgramActivityTaskOperationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSubProgramActivityTaskOperationFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CreateSubProgramActivityTaskOperationFormComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
