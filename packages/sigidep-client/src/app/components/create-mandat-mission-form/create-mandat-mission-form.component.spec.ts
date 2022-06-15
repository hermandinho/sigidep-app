import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMandatMissionFormComponent } from './create-mandat-mission-form.component';

describe('CreateMandatMissionFormComponent', () => {
  let component: CreateMandatMissionFormComponent;
  let fixture: ComponentFixture<CreateMandatMissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMandatMissionFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMandatMissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
