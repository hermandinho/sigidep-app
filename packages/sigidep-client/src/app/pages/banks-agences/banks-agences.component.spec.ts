import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksAgencesComponent } from './banks-agences.component';

describe('BanksAgencesComponent', () => {
  let component: BanksAgencesComponent;
  let fixture: ComponentFixture<BanksAgencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BanksAgencesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanksAgencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
