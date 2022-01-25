import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGradeFormComponent } from './create-grade-form.component';

describe('CreateGradeFormComponent', () => {
  let component: CreateGradeFormComponent;
  let fixture: ComponentFixture<CreateGradeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateGradeFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGradeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
