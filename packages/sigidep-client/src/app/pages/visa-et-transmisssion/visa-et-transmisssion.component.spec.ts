import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaEtTransmisssionComponent } from './visa-et-transmisssion.component';

describe('VisaEtTransmisssionComponent', () => {
  let component: VisaEtTransmisssionComponent;
  let fixture: ComponentFixture<VisaEtTransmisssionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaEtTransmisssionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaEtTransmisssionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
