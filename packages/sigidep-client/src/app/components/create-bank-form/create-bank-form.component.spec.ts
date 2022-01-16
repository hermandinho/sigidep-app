import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBankFormComponent } from './create-bank-form.component';

describe('CreateBankFormComponent', () => {
  let component: CreateBankFormComponent;
  let fixture: ComponentFixture<CreateBankFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBankFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBankFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
