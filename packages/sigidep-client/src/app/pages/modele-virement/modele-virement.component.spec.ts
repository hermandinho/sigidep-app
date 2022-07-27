import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleVirementComponent } from './modele-virement.component';

describe('ModeleVirementComponent', () => {
  let component: ModeleVirementComponent;
  let fixture: ComponentFixture<ModeleVirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeleVirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeleVirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
