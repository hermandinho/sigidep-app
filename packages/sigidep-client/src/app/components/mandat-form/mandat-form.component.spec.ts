import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandatFormComponent } from './mandat-form.component';

describe('MandatFormComponent', () => {
  let component: MandatFormComponent;
  let fixture: ComponentFixture<MandatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandatFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
