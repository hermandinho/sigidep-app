import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiseADispositionAgentComponent } from './mise-a-disposition-agent.component';

describe('MiseADispositionAgentComponent', () => {
  let component: MiseADispositionAgentComponent;
  let fixture: ComponentFixture<MiseADispositionAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiseADispositionAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiseADispositionAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
