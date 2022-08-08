import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordonneesBordereauFormComponent } from './coordonnees-bordereau-form.component';

describe('CoordonneesBordereauFormComponent', () => {
  let component: CoordonneesBordereauFormComponent;
  let fixture: ComponentFixture<CoordonneesBordereauFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordonneesBordereauFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordonneesBordereauFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
