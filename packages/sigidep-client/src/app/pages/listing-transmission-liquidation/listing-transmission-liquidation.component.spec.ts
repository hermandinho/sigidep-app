import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingTransmissionLiquidationComponent } from './listing-transmission-liquidation.component';

describe('ListingTransmissionLiquidationComponent', () => {
  let component: ListingTransmissionLiquidationComponent;
  let fixture: ComponentFixture<ListingTransmissionLiquidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingTransmissionLiquidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingTransmissionLiquidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
