import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueLiquiderFormComponent } from './rubrique-liquider-form.component';

describe('RubriqueLiquiderFormComponent', () => {
  let component: RubriqueLiquiderFormComponent;
  let fixture: ComponentFixture<RubriqueLiquiderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubriqueLiquiderFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueLiquiderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
