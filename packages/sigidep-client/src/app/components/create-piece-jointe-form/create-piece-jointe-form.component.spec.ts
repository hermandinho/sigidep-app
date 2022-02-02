import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePieceJointeFormComponent } from './create-piece-jointe-form.component';

describe('CreatePieceJointeFormComponent', () => {
  let component: CreatePieceJointeFormComponent;
  let fixture: ComponentFixture<CreatePieceJointeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePieceJointeFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePieceJointeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
