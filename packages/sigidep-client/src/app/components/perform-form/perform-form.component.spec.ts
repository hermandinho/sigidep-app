import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformFormComponent } from './perform-form.component';

describe('PerformFormComponent', () => {
  let component: PerformFormComponent;
  let fixture: ComponentFixture<PerformFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
