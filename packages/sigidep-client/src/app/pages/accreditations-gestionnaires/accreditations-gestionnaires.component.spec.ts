import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationsGestionnairesComponent } from './accreditations-gestionnaires.component';

describe('AccreditationsGestionnairesComponent', () => {
  let component: AccreditationsGestionnairesComponent;
  let fixture: ComponentFixture<AccreditationsGestionnairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccreditationsGestionnairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationsGestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
