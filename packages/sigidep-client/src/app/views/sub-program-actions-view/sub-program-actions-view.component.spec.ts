import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProgramActionsViewComponent } from './sub-program-actions-view.component';

describe('SubProgramActivitiesViewComponent', () => {
  let component: SubProgramActionsViewComponent;
  let fixture: ComponentFixture<SubProgramActionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubProgramActionsViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProgramActionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
