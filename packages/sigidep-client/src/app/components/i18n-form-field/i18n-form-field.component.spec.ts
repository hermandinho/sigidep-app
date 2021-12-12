import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nFormFieldComponent } from './i18n-form-field.component';

describe('I18nFormFieldComponent', () => {
  let component: I18nFormFieldComponent;
  let fixture: ComponentFixture<I18nFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [I18nFormFieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I18nFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
