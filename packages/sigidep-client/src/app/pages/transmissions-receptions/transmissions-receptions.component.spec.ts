import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionsReceptionsComponent } from './transmissions-receptions.component';

describe('TransmissionsReceptionsComponent', () => {
  let component: TransmissionsReceptionsComponent;
  let fixture: ComponentFixture<TransmissionsReceptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransmissionsReceptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmissionsReceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
