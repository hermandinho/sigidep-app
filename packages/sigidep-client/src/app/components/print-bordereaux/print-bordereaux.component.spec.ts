import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:packages/sigidep-client/src/app/pages/modele-virement/modele-virement.component.spec.ts
import { ModeleVirementComponent } from './modele-virement.component';

describe('ModeleVirementComponent', () => {
  let component: ModeleVirementComponent;
  let fixture: ComponentFixture<ModeleVirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeleVirementComponent ]
========
import { PrintBordereauxComponent } from './print-bordereaux.component';

describe('PrintBordereauxComponent', () => {
  let component: PrintBordereauxComponent;
  let fixture: ComponentFixture<PrintBordereauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintBordereauxComponent ]
>>>>>>>> 5b9bc0dd947223c9d9f5eb13f6b927d31fb1de59:packages/sigidep-client/src/app/components/print-bordereaux/print-bordereaux.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<<< HEAD:packages/sigidep-client/src/app/pages/modele-virement/modele-virement.component.spec.ts
    fixture = TestBed.createComponent(ModeleVirementComponent);
========
    fixture = TestBed.createComponent(PrintBordereauxComponent);
>>>>>>>> 5b9bc0dd947223c9d9f5eb13f6b927d31fb1de59:packages/sigidep-client/src/app/components/print-bordereaux/print-bordereaux.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
