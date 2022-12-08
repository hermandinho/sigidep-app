import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StructureModel } from '@models/structure.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StructuresService {
  // @ts-ignore
  private readonly client: HttpClient;
  constructor(private readonly http: HttpClient) {
    this.client = http;
  }

  public check(): Promise<StructureModel> {
    return this.client
      .get<StructureModel>(environment.API_URL + '/structure/check')
      .toPromise();
  }

  public create(payload: StructureModel): Observable<StructureModel> {
    return this.client.post<StructureModel>(
      environment.API_URL + '/structure',
      payload
    );
  }

  public get(): Promise<StructureModel[]> {
    return this.client
      .get<StructureModel[]>(environment.API_URL + '/structure/get/all')
      .toPromise();
  }

  public delete(id:number){
    return this.client
      .get<any>(environment.API_URL + '/structure/'+id)
      .toPromise();
  }

  public getStructureDefault(){
    return this.client.get<StructureModel>(
      environment.API_URL + '/structure/get/Structure/Default').toPromise();;
  }
}
