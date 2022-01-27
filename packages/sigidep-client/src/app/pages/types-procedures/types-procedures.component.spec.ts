import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesProceduresComponent } from './types-procedures.component';

describe('TypesProceduresComponent', () => {
  let component: TypesProceduresComponent;
  let fixture: ComponentFixture<TypesProceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypesProceduresComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
