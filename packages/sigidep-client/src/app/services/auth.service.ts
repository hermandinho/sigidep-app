import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {Observable} from "rxjs";
import {AuthModel, LoginModel} from "@models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly client: HttpClient;
  constructor(
    private readonly http: HttpClient,
  ) {
    this.client = http;
  }

  public login(
    payload: LoginModel,
  ): Observable<AuthModel> {
    return this.client.post<AuthModel>(environment.API_URL + '/auth/login', payload);
  }
}
