import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieAgentFormComponent } from './categorie-agent-form.component';

describe('CategorieAgentFormComponent', () => {
  let component: CategorieAgentFormComponent;
  let fixture: ComponentFixture<CategorieAgentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorieAgentFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieAgentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
