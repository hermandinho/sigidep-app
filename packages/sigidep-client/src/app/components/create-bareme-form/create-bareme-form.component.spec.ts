import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBaremeFormComponent } from './create-bareme-form.component';

describe('CreateBaremeFormComponent', () => {
  let component: CreateBaremeFormComponent;
  let fixture: ComponentFixture<CreateBaremeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBaremeFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBaremeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
