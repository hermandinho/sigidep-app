import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVirementFormComponent } from './details-virement-form.component';

describe('DetailsVirementFormComponent', () => {
  let component: DetailsVirementFormComponent;
  let fixture: ComponentFixture<DetailsVirementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsVirementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVirementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
