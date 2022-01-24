import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarnetFormComponent } from './create-carnet-form.component';

describe('CreateCarnetFormComponent', () => {
  let component: CreateCarnetFormComponent;
  let fixture: ComponentFixture<CreateCarnetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCarnetFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarnetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
