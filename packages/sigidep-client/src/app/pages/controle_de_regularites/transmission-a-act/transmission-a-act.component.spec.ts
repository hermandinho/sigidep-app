import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionAACTComponent } from './transmission-a-act.component';

describe('TransmissionAACTComponent', () => {
  let component: TransmissionAACTComponent;
  let fixture: ComponentFixture<TransmissionAACTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransmissionAACTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmissionAACTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
