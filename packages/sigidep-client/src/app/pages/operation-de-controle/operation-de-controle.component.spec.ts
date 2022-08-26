import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationDeControleComponent } from './operation-de-controle.component';

describe('OperationDeControleComponent', () => {
  let component: OperationDeControleComponent;
  let fixture: ComponentFixture<OperationDeControleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationDeControleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationDeControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
