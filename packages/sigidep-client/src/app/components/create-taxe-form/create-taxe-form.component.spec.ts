import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaxeFormComponent } from './create-taxe-form.component';

describe('CreateTaxeFormComponent', () => {
  let component: CreateTaxeFormComponent;
  let fixture: ComponentFixture<CreateTaxeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTaxeFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaxeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
