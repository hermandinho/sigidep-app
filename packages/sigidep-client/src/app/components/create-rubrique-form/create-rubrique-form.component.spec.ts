import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRubriqueFormComponent } from './create-rubrique-form.component';

describe('CreateRubriqueFormComponent', () => {
  let component: CreateRubriqueFormComponent;
  let fixture: ComponentFixture<CreateRubriqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRubriqueFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRubriqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
