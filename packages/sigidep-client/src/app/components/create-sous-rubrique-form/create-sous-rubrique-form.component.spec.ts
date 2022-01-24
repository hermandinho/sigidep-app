import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSousRubriqueFormComponent } from './create-sous-rubrique-form.component';

describe('CreateSousRubriqueFormComponent', () => {
  let component: CreateSousRubriqueFormComponent;
  let fixture: ComponentFixture<CreateSousRubriqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSousRubriqueFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSousRubriqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
