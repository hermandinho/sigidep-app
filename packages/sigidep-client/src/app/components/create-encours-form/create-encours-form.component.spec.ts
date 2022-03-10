import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEncoursFormComponent } from './create-encours-form.component';

describe('CreateEncoursFormComponent', () => {
  let component: CreateEncoursFormComponent;
  let fixture: ComponentFixture<CreateEncoursFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEncoursFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEncoursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
