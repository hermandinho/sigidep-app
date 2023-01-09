import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeEtCoordonneesDePaiementComponent } from './mode-et-coordonnees-de-paiement.component';

describe('ModeEtCoordonneesDePaiementComponent', () => {
  let component: ModeEtCoordonneesDePaiementComponent;
  let fixture: ComponentFixture<ModeEtCoordonneesDePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeEtCoordonneesDePaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeEtCoordonneesDePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
