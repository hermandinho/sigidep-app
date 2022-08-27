import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirementBodyFormComponent } from './virement-body-form.component';

describe('VirementBodyFormComponent', () => {
  let component: VirementBodyFormComponent;
  let fixture: ComponentFixture<VirementBodyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirementBodyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirementBodyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
