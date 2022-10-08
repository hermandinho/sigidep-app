import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePayerMandatComponent } from './create-payer-mandat.component';

describe('CreatePayerMandatComponent', () => {
  let component: CreatePayerMandatComponent;
  let fixture: ComponentFixture<CreatePayerMandatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePayerMandatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePayerMandatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
