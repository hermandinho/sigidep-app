import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintInfoUserComponent } from './print-info-user.component';

describe('PrintInfoUserComponent', () => {
  let component: PrintInfoUserComponent;
  let fixture: ComponentFixture<PrintInfoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintInfoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
