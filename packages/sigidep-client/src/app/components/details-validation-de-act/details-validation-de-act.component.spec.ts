import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsValidationDeACTComponent } from './details-validation-de-act.component';

describe('DetailsValidationDeACTComponent', () => {
  let component: DetailsValidationDeACTComponent;
  let fixture: ComponentFixture<DetailsValidationDeACTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsValidationDeACTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsValidationDeACTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
