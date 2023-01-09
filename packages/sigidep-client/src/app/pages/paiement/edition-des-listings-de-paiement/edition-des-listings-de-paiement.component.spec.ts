import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionDesListingsDePaiementComponent } from './edition-des-listings-de-paiement.component';

describe('EditionDesListingsDePaiementComponent', () => {
  let component: EditionDesListingsDePaiementComponent;
  let fixture: ComponentFixture<EditionDesListingsDePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionDesListingsDePaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionDesListingsDePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
