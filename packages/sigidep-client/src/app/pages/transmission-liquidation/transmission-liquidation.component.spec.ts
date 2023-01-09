import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionLiquidationComponent } from './transmission-liquidation.component';

describe('TransmissionLiquidationComponent', () => {
  let component: TransmissionLiquidationComponent;
  let fixture: ComponentFixture<TransmissionLiquidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransmissionLiquidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmissionLiquidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
