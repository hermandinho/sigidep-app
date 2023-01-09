import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleRegulariteComponent } from './controle-regularite.component';

describe('ControleRegulariteComponent', () => {
  let component: ControleRegulariteComponent;
  let fixture: ComponentFixture<ControleRegulariteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControleRegulariteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleRegulariteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
