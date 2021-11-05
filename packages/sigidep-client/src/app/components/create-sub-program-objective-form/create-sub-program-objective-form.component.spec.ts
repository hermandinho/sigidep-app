import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubProgramObjectiveFormComponent } from './create-sub-program-objective-form.component';

describe('CreateSubProgramObjectiveFormComponent', () => {
  let component: CreateSubProgramObjectiveFormComponent;
  let fixture: ComponentFixture<CreateSubProgramObjectiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSubProgramObjectiveFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubProgramObjectiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
