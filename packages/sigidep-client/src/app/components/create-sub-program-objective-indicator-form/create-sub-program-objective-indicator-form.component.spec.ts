import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubProgramObjectiveIndicatorFormComponent } from './create-sub-program-objective-indicator-form.component';

describe('CreateSubProgramObjectiveIndicatorFormComponent', () => {
  let component: CreateSubProgramObjectiveIndicatorFormComponent;
  let fixture: ComponentFixture<CreateSubProgramObjectiveIndicatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSubProgramObjectiveIndicatorFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CreateSubProgramObjectiveIndicatorFormComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
