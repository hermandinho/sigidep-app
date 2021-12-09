import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReferencePhysicalUnitsFormComponent } from './create-reference-physical-units-form.component';

describe('CreateReferencePhysicalUnitsFormComponent', () => {
  let component: CreateReferencePhysicalUnitsFormComponent;
  let fixture: ComponentFixture<CreateReferencePhysicalUnitsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateReferencePhysicalUnitsFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CreateReferencePhysicalUnitsFormComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
