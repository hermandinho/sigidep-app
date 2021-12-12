import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubProgramFormComponent } from './create-sub-program-form.component';

describe('CreateSubProgramFormComponent', () => {
  let component: CreateSubProgramFormComponent;
  let fixture: ComponentFixture<CreateSubProgramFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSubProgramFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubProgramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
