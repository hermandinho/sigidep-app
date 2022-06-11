import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSituationTraitementComponent } from './create-situation-traitement.component';

describe('CreateSituationTraitementComponent', () => {
  let component: CreateSituationTraitementComponent;
  let fixture: ComponentFixture<CreateSituationTraitementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSituationTraitementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSituationTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
