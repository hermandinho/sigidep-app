import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandatsCommandesComponent } from './mandats-commandes.component';

describe('MandatsCommandesComponent', () => {
  let component: MandatsCommandesComponent;
  let fixture: ComponentFixture<MandatsCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MandatsCommandesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandatsCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
