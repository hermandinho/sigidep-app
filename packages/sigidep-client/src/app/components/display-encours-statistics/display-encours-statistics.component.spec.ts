import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEncoursStatisticsComponent } from './display-encours-statistics.component';

describe('DisplayEncoursStatisticsComponent', () => {
  let component: DisplayEncoursStatisticsComponent;
  let fixture: ComponentFixture<DisplayEncoursStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayEncoursStatisticsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayEncoursStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
