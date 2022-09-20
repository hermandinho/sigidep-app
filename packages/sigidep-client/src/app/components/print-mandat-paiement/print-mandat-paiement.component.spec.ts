import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMandatPaiementComponent } from './print-mandat-paiement.component';

describe('PrintMandatPaiementComponent', () => {
  let component: PrintMandatPaiementComponent;
  let fixture: ComponentFixture<PrintMandatPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintMandatPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintMandatPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
