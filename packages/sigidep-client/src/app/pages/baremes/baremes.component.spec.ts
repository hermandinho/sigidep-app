import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaremesComponent } from './baremes.component';

describe('BaremesComponent', () => {
  let component: BaremesComponent;
  let fixture: ComponentFixture<BaremesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaremesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaremesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
