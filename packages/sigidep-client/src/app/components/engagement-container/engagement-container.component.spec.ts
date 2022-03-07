import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementContainerComponent } from './engagement-container.component';

describe('EngagementContainerComponent', () => {
  let component: EngagementContainerComponent;
  let fixture: ComponentFixture<EngagementContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EngagementContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
