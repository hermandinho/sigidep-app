import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFactureFormComponent } from './create-facture-form.component';

describe('CreateFactureFormComponent', () => {
  let component: CreateFactureFormComponent;
  let fixture: ComponentFixture<CreateFactureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFactureFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFactureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
