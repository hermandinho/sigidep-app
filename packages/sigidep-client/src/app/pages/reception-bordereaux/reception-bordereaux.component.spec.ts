import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionBordereauxComponent } from './reception-bordereaux.component';

describe('ReceptionBordereauxComponent', () => {
  let component: ReceptionBordereauxComponent;
  let fixture: ComponentFixture<ReceptionBordereauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionBordereauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionBordereauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
