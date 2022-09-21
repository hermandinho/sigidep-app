import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTraitementLiquidationMandatementComponent } from './create-traitement-liquidation-mandatement.component';

describe('CreateTraitementLiquidationMandatementComponent', () => {
  let component: CreateTraitementLiquidationMandatementComponent;
  let fixture: ComponentFixture<CreateTraitementLiquidationMandatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTraitementLiquidationMandatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTraitementLiquidationMandatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
