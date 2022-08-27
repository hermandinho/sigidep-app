import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVirementMessageComponent } from './show-virement-message.component';

describe('ShowVirementMessageComponent', () => {
  let component: ShowVirementMessageComponent;
  let fixture: ComponentFixture<ShowVirementMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVirementMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVirementMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
