import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsValidationPaiementComponent } from './operations-validation-paiement.component';

describe('OperationsValidationPaiementComponent', () => {
  let component: OperationsValidationPaiementComponent;
  let fixture: ComponentFixture<OperationsValidationPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsValidationPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsValidationPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
