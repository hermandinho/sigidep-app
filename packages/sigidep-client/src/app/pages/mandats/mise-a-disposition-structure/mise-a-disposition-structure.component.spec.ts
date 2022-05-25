import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiseADispositionStructureComponent } from './mise-a-disposition-structure.component';

describe('MiseADispositionStructureComponent', () => {
  let component: MiseADispositionStructureComponent;
  let fixture: ComponentFixture<MiseADispositionStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiseADispositionStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiseADispositionStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
