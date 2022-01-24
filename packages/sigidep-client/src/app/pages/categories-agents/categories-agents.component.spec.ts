import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesAgentsComponent } from './categories-agents.component';

describe('CategoriesAgentsComponent', () => {
  let component: CategoriesAgentsComponent;
  let fixture: ComponentFixture<CategoriesAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesAgentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
