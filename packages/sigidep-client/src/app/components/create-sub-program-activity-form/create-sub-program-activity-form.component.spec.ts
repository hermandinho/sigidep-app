import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubProgramActivityFormComponent } from './create-sub-program-activity-form.component';

describe('CreateSubProgramActivityFormComponent', () => {
  let component: CreateSubProgramActivityFormComponent;
  let fixture: ComponentFixture<CreateSubProgramActivityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSubProgramActivityFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubProgramActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
