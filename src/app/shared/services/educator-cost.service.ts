import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { EducatorCostFilterModel } from '../model/educator-cost-filter-model';
import { EducatorCostModel } from '../model/educator-cost-model';
import { EducatorLessonCostModel } from '../model/educator-lesson-cost-model';

@Injectable({
  providedIn: 'root'
})
export class EducatorCostService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/EducatorLessonCost/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListByFilter(filter: EducatorCostFilterModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/EducatorLessonCost/ListByFilter`, filter)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: EducatorCostModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/EducatorLessonCost/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: EducatorLessonCostModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/EducatorLessonCost/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/EducatorLessonCost/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getByEducator(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/EducatorLessonCost/GetByEducator/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/EducatorLessonCost/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getEarning(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/EducatorLessonCost/EarningEducator`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
