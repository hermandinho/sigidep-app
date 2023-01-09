import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleConformiteComponent } from './controle-conformite.component';

describe('ControleConformiteComponent', () => {
  let component: ControleConformiteComponent;
  let fixture: ComponentFixture<ControleConformiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControleConformiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleConformiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
