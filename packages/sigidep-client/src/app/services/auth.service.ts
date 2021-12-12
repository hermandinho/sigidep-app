import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { LoginModel, LoginSuccessModel } from '@models/auth.model';
import { UserModel } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly client: HttpClient;
  constructor(private readonly http: HttpClient) {
    this.client = http;
  }

  public login(payload: LoginModel): Observable<LoginSuccessModel> {
    return this.client.post<LoginSuccessModel>(
      environment.API_URL + '/auth/login',
      payload
    );
  }

  public me(): Observable<UserModel> {
    return this.client.get<UserModel>(environment.API_URL + '/auth/me');
  }
}
