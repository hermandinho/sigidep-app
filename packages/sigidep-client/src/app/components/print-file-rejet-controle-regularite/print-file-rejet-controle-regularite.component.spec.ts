import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintFileRejetControleRegulariteComponent } from './print-file-rejet-controle-regularite.component';

describe('PrintFileRejetControleRegulariteComponent', () => {
  let component: PrintFileRejetControleRegulariteComponent;
  let fixture: ComponentFixture<PrintFileRejetControleRegulariteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintFileRejetControleRegulariteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintFileRejetControleRegulariteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
