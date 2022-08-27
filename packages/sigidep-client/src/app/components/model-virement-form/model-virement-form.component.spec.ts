import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelVirementFormComponent } from './model-virement-form.component';

describe('ModelVirementFormComponent', () => {
  let component: ModelVirementFormComponent;
  let fixture: ComponentFixture<ModelVirementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelVirementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVirementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
