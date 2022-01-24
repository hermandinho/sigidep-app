import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribuablesBudgetairesComponent } from './contribuables-budgetaires.component';

describe('ContribuablesBudgetairesComponent', () => {
  let component: ContribuablesBudgetairesComponent;
  let fixture: ComponentFixture<ContribuablesBudgetairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribuablesBudgetairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribuablesBudgetairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
