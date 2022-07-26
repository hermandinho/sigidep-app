import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputationsComponent } from './imputations.component';

describe('ImputationsComponent', () => {
  let component: ImputationsComponent;
  let fixture: ComponentFixture<ImputationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImputationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImputationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
