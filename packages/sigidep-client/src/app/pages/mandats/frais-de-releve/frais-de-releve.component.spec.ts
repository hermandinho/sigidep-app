import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisDeReleveComponent } from './frais-de-releve.component';

describe('FraisDeReleveComponent', () => {
  let component: FraisDeReleveComponent;
  let fixture: ComponentFixture<FraisDeReleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FraisDeReleveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FraisDeReleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
