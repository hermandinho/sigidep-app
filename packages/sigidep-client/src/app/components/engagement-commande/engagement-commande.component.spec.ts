import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementCommandeComponent } from './engagement-commande.component';

describe('EngagementCommandeComponent', () => {
  let component: EngagementCommandeComponent;
  let fixture: ComponentFixture<EngagementCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EngagementCommandeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
