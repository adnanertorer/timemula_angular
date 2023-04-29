import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActualCustomerLessonModel } from '../model/actual-customer-lesson-model';
import { ActualForMoveModel } from '../model/actual-for-move-model';
import { BaseResponse } from '../model/BaseResponse';
import { CriteriaFilterModel } from '../model/criteria-filter-model';
import { SellPackageCriteriaModel } from '../model/sell-package-criteria-model';

@Injectable({
  providedIn: 'root'
})

export class ActualCustomerLessonService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getLessonMains(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/GetLessonMains`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getTotalStudentInToday(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/GetStudentCountInToDay`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  daysBeforeEnd(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/DaysBeforeEnd`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getSaledPackageCount(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/SaledPackage`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getCurrentLessonSummary(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/GetCurrentLessonSummary`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  listByFilterActualMultiTime(resource: SellPackageCriteriaModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/ListByFilterMultiTime`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListByFilter(resource: CriteriaFilterModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/ListByFilter`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: ActualForMoveModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: ActualCustomerLessonModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  cancelLesson(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/CancelLesson/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  approvedLessonsByEducator(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/ApprovedLessonsByEducator/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getProgramByEducator(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/EducatorLessonCost/GetProgramByEducator/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDoneLessonsByEducator(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/EducatorLessonCost/GetDoneLessonsByEducator/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  setApprove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/SetApproveLesson/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListByPackage(customerId: number, unicStrId: string){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/ListByPackage/?customerId=${customerId.toString()}&unicStrId=${unicStrId}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getActiveLessons(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/GetActiveLessons`)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
