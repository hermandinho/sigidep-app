import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProgramsListComponent } from './sub-programs-list.component';

describe('SubProgramsListComponent', () => {
  let component: SubProgramsListComponent;
  let fixture: ComponentFixture<SubProgramsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubProgramsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProgramsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
