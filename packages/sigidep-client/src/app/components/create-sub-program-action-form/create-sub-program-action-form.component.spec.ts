import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubProgramActionFormComponent } from './create-sub-program-action-form.component';

describe('CreateSubProgramActionFormComponent', () => {
  let component: CreateSubProgramActionFormComponent;
  let fixture: ComponentFixture<CreateSubProgramActionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSubProgramActionFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubProgramActionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
