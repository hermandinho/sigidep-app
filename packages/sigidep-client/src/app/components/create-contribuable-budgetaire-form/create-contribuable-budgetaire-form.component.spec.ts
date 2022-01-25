import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContribuableBudgetaireFormComponent } from './create-contribuable-budgetaire-form.component';

describe('CreateContribuableBudgetaireFormComponent', () => {
  let component: CreateContribuableBudgetaireFormComponent;
  let fixture: ComponentFixture<CreateContribuableBudgetaireFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateContribuableBudgetaireFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CreateContribuableBudgetaireFormComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
