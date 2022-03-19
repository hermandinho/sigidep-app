import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTypeProcedureFormComponent } from './create-type-procedure-form.component';

describe('CreateTypeProcedureFormComponent', () => {
  let component: CreateTypeProcedureFormComponent;
  let fixture: ComponentFixture<CreateTypeProcedureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTypeProcedureFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTypeProcedureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
