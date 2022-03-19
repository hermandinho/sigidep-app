import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEngagementFormComponent } from './create-engagement-form.component';

describe('CreateEngagementFormComponent', () => {
  let component: CreateEngagementFormComponent;
  let fixture: ComponentFixture<CreateEngagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEngagementFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEngagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
