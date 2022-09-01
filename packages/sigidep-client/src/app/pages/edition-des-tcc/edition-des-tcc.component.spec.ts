import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionDesTCCComponent } from './edition-des-tcc.component';

describe('EditionDesTCCComponent', () => {
  let component: EditionDesTCCComponent;
  let fixture: ComponentFixture<EditionDesTCCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionDesTCCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionDesTCCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
