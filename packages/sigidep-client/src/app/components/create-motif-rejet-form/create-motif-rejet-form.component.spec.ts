import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMotifRejetFormComponent } from './create-motif-rejet-form.component';

describe('CreateMotifRejetFormComponent', () => {
  let component: CreateMotifRejetFormComponent;
  let fixture: ComponentFixture<CreateMotifRejetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMotifRejetFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMotifRejetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
