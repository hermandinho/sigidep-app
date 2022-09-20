import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionBordereauxComponent } from './transmission-bordereaux.component';

describe('TransmissionBordereauxComponent', () => {
  let component: TransmissionBordereauxComponent;
  let fixture: ComponentFixture<TransmissionBordereauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransmissionBordereauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmissionBordereauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
