import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRegionsFormComponent } from './create-regions-form.component';

describe('CreateRegionsFormComponent', () => {
  let component: CreateRegionsFormComponent;
  let fixture: ComponentFixture<CreateRegionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRegionsFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRegionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
