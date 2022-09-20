import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceJointeFormComponent } from './piece-jointe-form.component';

describe('PieceJointeFormComponent', () => {
  let component: PieceJointeFormComponent;
  let fixture: ComponentFixture<PieceJointeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieceJointeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceJointeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
