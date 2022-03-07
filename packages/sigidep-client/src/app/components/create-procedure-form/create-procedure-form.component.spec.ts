import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProcedureFormComponent } from './create-procedure-form.component';

describe('CreateProcedureFormComponent', () => {
  let component: CreateProcedureFormComponent;
  let fixture: ComponentFixture<CreateProcedureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProcedureFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProcedureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
