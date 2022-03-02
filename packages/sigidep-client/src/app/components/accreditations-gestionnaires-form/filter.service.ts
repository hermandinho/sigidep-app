import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncoursModel } from '@models/encours.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private readonly http: HttpClient) { }

  public getEncoursByExercice(id: number) {
    return this.http.get<EncoursModel>(`/encours/exercice/${id}`)
  }
}
