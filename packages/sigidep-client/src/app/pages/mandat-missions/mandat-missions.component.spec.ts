import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandatMissionsComponent } from './mandat-missions.component';

describe('MandatMissionsComponent', () => {
  let component: MandatMissionsComponent;
  let fixture: ComponentFixture<MandatMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandatMissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandatMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
