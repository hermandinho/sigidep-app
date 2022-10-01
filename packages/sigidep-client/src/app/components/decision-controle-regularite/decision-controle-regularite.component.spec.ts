import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionControleRegulariteComponent } from './decision-controle-regularite.component';

describe('DecisionControleRegulariteComponent', () => {
  let component: DecisionControleRegulariteComponent;
  let fixture: ComponentFixture<DecisionControleRegulariteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecisionControleRegulariteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionControleRegulariteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
