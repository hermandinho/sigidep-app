import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonDeCommandeAdminComponent } from './bon-de-commande-admin.component';

describe('BonDeCommandeAdminComponent', () => {
  let component: BonDeCommandeAdminComponent;
  let fixture: ComponentFixture<BonDeCommandeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonDeCommandeAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonDeCommandeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
