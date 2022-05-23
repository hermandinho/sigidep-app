import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMandatFormComponent } from './create-mandat-form.component';

describe('CreateMandatFormComponent', () => {
  let component: CreateMandatFormComponent;
  let fixture: ComponentFixture<CreateMandatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMandatFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMandatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
