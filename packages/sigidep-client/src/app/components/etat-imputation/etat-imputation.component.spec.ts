import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatImputationComponent } from './etat-imputation.component';

describe('EtatImputationComponent', () => {
  let component: EtatImputationComponent;
  let fixture: ComponentFixture<EtatImputationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtatImputationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatImputationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
