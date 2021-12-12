import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencePhysicalUnitsComponent } from './reference-physical-units.component';

describe('ReferencePhysicalUnitsComponent', () => {
  let component: ReferencePhysicalUnitsComponent;
  let fixture: ComponentFixture<ReferencePhysicalUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReferencePhysicalUnitsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencePhysicalUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
