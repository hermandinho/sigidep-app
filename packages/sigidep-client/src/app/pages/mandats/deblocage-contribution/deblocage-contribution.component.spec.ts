import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeblocageContributionComponent } from './deblocage-contribution.component';

describe('DeblocageContributionComponent', () => {
  let component: DeblocageContributionComponent;
  let fixture: ComponentFixture<DeblocageContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeblocageContributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeblocageContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
