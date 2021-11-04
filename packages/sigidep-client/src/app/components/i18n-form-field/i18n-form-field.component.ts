import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-i18n-form-field',
  templateUrl: './i18n-form-field.component.html',
  styleUrls: ['./i18n-form-field.component.scss'],
})
export class I18nFormFieldComponent implements OnInit {
  @Input()
  public form!: FormGroup;

  @Input()
  public type: 'text' | 'textarea' = 'text';

  @Input()
  public placeholder: string = '';

  @Input()
  public baseFormControlName!: string;

  currentLang: string = 'fr';

  public languages = ['fr', 'en'];

  constructor() {}

  ngOnInit(): void {}

  get getFormControlNameForLang(): string {
    const lang = this.currentLang ?? 'fr';
    return this.baseFormControlName + lang[0].toUpperCase() + lang.slice(1);
  }
}
