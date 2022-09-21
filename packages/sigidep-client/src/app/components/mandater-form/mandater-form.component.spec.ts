import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandaterFormComponent } from './mandater-form.component';

describe('MandaterFormComponent', () => {
  let component: MandaterFormComponent;
  let fixture: ComponentFixture<MandaterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandaterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandaterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
