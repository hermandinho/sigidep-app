import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionPourControleDeRegulariteComponent } from './reception-pour-controle-de-regularite.component';

describe('ReceptionPourControleDeRegulariteComponent', () => {
  let component: ReceptionPourControleDeRegulariteComponent;
  let fixture: ComponentFixture<ReceptionPourControleDeRegulariteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionPourControleDeRegulariteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionPourControleDeRegulariteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
