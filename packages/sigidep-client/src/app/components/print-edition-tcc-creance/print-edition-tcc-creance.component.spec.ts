import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintEditionTccCreanceComponent } from './print-edition-tcc-creance.component';

describe('PrintEditionTccCreanceComponent', () => {
  let component: PrintEditionTccCreanceComponent;
  let fixture: ComponentFixture<PrintEditionTccCreanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintEditionTccCreanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintEditionTccCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
