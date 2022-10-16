import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { ClassroomModel } from '../model/classroom-model';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/Classroom/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: ClassroomModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/Classroom/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: ClassroomModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/Classroom/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}Clasroom/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}Clasroom/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
