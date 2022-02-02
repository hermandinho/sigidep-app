import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationsGestionnairesFormComponent } from './accreditations-gestionnaires-form.component';

describe('AccreditationsGestionnairesFormComponent', () => {
  let component: AccreditationsGestionnairesFormComponent;
  let fixture: ComponentFixture<AccreditationsGestionnairesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccreditationsGestionnairesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationsGestionnairesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
