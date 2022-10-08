import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateValiderRejeterMandatComponent } from './create-valider-rejeter-mandat.component';

describe('CreateValiderRejeterMandatComponent', () => {
  let component: CreateValiderRejeterMandatComponent;
  let fixture: ComponentFixture<CreateValiderRejeterMandatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateValiderRejeterMandatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateValiderRejeterMandatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
