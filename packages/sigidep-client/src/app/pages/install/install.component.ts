import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StructuresService } from '@services/structures.service';
import { StructureModel } from '@models/structure.model';
import { BaseComponent } from '@components/base.component';
import { environment } from '@environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.scss'],
  providers: [MessageService],
})
export class InstallComponent extends BaseComponent implements OnInit {
  public year = new Date().getFullYear();

  public busy = false;
  public error: any;

  // @ts-ignore
  public form: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private readonly structuresService: StructuresService,
    private messageService: MessageService
  ) {
    super();
  }

  get code() {
    return this.form.get('code') as FormControl;
  }

  ngOnInit(): void {
    const isDev = !environment.production;
    this.form = this._fb.group({
      code: [
        isDev ? '12' : undefined,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      labelFr: [isDev ? 'Ministere du code' : undefined, [Validators.required]],
      labelEn: [isDev ? 'Ministry of code' : undefined, [Validators.required]],
      descriptionEn: [isDev ? 'Cool stuff' : undefined, [Validators.required]],
      descriptionFr: [isDev ? 'Super' : undefined, [Validators.required]],
      missionsEn: [isDev ? 'RAS' : undefined, [Validators.required]],
      missionsFr: [isDev ? 'RAS' : undefined, [Validators.required]],
      address: [isDev ? 'Yaounde' : undefined, [Validators.required]],
    });
  }

  submit() {
    this.error = null;
    this.messageService.clear();
    if (!this.form?.valid) return;
    this.busy = true;
    this.form?.setErrors(null);
    this.structuresService
      .create(this.form.value as StructureModel)
      /*.pipe(
        this.takeUntilDestroy,
      )*/
      .subscribe(
        (payload) => {
          this.busy = false;
          console.log(payload);
        },
        ({ error }) => {
          this.busy = false;
          this.error = error;
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail:
              error?.statusCode === 409
                ? 'Le système est dejà installé.'
                : "Une erreur est survenue lors de l'installation de la structure",
            life: 5000,
            closable: true,
          });
        }
      );
  }
}
