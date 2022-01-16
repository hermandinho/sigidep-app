import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAgenceBankFormComponent } from './create-agence-bank-form.component';

describe('CreateAgenceBankFormComponent', () => {
  let component: CreateAgenceBankFormComponent;
  let fixture: ComponentFixture<CreateAgenceBankFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAgenceBankFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAgenceBankFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
