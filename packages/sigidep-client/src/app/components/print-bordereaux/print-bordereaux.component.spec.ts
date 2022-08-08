import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBordereauxComponent } from './print-bordereaux.component';

describe('PrintBordereauxComponent', () => {
  let component: PrintBordereauxComponent;
  let fixture: ComponentFixture<PrintBordereauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintBordereauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintBordereauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
