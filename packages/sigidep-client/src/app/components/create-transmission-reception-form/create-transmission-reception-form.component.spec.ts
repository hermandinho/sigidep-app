import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransmissionReceptionFormComponent } from './create-transmission-reception-form.component';

describe('CreateTransmissionReceptionFormComponent', () => {
  let component: CreateTransmissionReceptionFormComponent;
  let fixture: ComponentFixture<CreateTransmissionReceptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTransmissionReceptionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransmissionReceptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
