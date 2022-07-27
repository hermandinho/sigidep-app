import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVirementComponent } from './details-virement.component';

describe('DetailsVirementComponent', () => {
  let component: DetailsVirementComponent;
  let fixture: ComponentFixture<DetailsVirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsVirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
