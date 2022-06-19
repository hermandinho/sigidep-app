import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelVirementComponent } from './model-virement.component';

describe('ModelVirementComponent', () => {
  let component: ModelVirementComponent;
  let fixture: ComponentFixture<ModelVirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelVirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
