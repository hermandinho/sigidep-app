import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AuthService} from "@services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  busy = false;

  public error!: string;

  constructor(
    private messageService: MessageService,
    private _fb: FormBuilder,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      email: [undefined, [Validators.required, Validators.minLength(5)]],
      password: [undefined, [Validators.minLength(5), Validators.required]],
    });
  }

  submit() {
    this.busy = true;
    setTimeout(() => {
      this.busy = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        // detail: error?.statusCode === 409 ? "Le système est dejà installé." : "Une erreur est survenue lors de l'installation de la structure",
        life: 5000,
        closable: true,
      });
    }, 2000);

    // TODO add Welcome XX toast after login success

  }
}
