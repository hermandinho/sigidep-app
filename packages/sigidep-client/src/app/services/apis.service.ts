import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApisService {
  constructor(private readonly http: HttpClient) {}

  public get<T>(url: string, query?: any): Observable<T> {
    return this.http.get<T>(url, {
      params: query,
    });
  }

  public post<T>(url: string, payload: any, query?: any): Observable<T> {
    return this.http.post<T>(url, payload, {
      params: query,
    });
  }

  public put<T>(url: string, payload: any, query?: any): Observable<T> {
    return this.http.put<T>(url, payload, {
      params: query,
    });
  }

  public delete<T>(url: string, query: any): Observable<T> {
    return this.http.delete<T>(url, {
      params: query,
    });
  }

  public patch<T>(url: string, body: any, query?: any): Observable<T> {
    return this.http.patch<T>(url, body, {
      params: query,
    });
  }
}
