import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { LessonEducatorModel } from '../model/lesson-educator-model';
import { VCustomerLessonModel } from '../model/v-customer-lesson-model';
import { VCustomerPackageBasicInfoModel } from '../model/v-customer-package-basic-info-model';

@Injectable({
  providedIn: 'root'
})
export class LessonEducatorService {

  private readonly apiUrl = `${environment.apiUrl}`;
  public selectedTeacherStudents:  VCustomerPackageBasicInfoModel[];
  public selectedCustomerLessons: VCustomerLessonModel[];
  public selectedCustomerId: number;

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/LessonEducator/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: LessonEducatorModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/LessonEducator/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }


  update(resource: LessonEducatorModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/LessonEducator/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/LessonEducator/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getSeassions(unicStrId: string){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/LessonEducator/GetEducatorPackageSessions/?unicStrId=${unicStrId}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/LessonEducator/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getEducatorLesson(educatorId: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/LessonEducator/GetEducatorLessons/?educatorId=${educatorId.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getLessonList(lessonId: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/LessonEducator/ListByLesson/?lessonId=${lessonId.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
