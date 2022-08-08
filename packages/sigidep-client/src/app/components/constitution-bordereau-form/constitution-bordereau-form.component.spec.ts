import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstitutionBordereauFormComponent } from './constitution-bordereau-form.component';

describe('ConstitutionBordereauFormComponent', () => {
  let component: ConstitutionBordereauFormComponent;
  let fixture: ComponentFixture<ConstitutionBordereauFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstitutionBordereauFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstitutionBordereauFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
