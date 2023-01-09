import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirementValidationFormComponent } from './virement-validation-form.component';

describe('VirementValidationFormComponent', () => {
  let component: VirementValidationFormComponent;
  let fixture: ComponentFixture<VirementValidationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirementValidationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirementValidationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
