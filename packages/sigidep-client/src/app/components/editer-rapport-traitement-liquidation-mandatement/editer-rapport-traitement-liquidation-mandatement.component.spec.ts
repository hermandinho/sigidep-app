import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerRapportTraitementLiquidationMandatementComponent } from './editer-rapport-traitement-liquidation-mandatement.component';

describe('EditerRapportTraitementLiquidationMandatementComponent', () => {
  let component: EditerRapportTraitementLiquidationMandatementComponent;
  let fixture: ComponentFixture<EditerRapportTraitementLiquidationMandatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditerRapportTraitementLiquidationMandatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerRapportTraitementLiquidationMandatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
