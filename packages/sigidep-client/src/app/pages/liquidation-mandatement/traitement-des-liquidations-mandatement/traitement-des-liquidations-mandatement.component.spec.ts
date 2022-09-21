import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementDesLiquidationsMandatementComponent } from './traitement-des-liquidations-mandatement.component';

describe('TraitementDesLiquidationsMandatementComponent', () => {
  let component: TraitementDesLiquidationsMandatementComponent;
  let fixture: ComponentFixture<TraitementDesLiquidationsMandatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitementDesLiquidationsMandatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementDesLiquidationsMandatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
