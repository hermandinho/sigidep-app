import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEncoursItemComponent } from './display-encours-item.component';

describe('DisplayEncoursItemComponent', () => {
  let component: DisplayEncoursItemComponent;
  let fixture: ComponentFixture<DisplayEncoursItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayEncoursItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayEncoursItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
