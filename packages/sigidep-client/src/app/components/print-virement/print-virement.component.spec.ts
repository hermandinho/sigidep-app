import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintVirementComponent } from './print-virement.component';

describe('PrintVirementComponent', () => {
  let component: PrintVirementComponent;
  let fixture: ComponentFixture<PrintVirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintVirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintVirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
