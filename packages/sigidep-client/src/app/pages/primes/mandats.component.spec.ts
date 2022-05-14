import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandatsComponent } from './mandats.component';

describe('MandatsComponent', () => {
  let component: MandatsComponent;
  let fixture: ComponentFixture<MandatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
