import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { EducatorStudentsFilterResource } from '../model/educator-students-filter-resource';
import { StaffModel } from '../model/staff-model';
import { VCustomerLessonModel } from '../model/v-customer-lesson-model';
import { VCustomerPackageBasicInfoModel } from '../model/v-customer-package-basic-info-model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private readonly apiUrl = `${environment.apiUrl}`;
  public basicList: VCustomerPackageBasicInfoModel[] = [];
  public customerLessons: VCustomerLessonModel[] = [];

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/Staff/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getAdminList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/AdminUser/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getTeachers(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/Staff/EducatorList`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getTeachersByLesson(lessonId: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/LessonEducator/ListByLesson/?lessonId=${lessonId.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getEducatorStudents(resource: EducatorStudentsFilterResource){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/Staff/EducatorStudents`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: StaffModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/Staff/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: StaffModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/Staff/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/Staff/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/Staff/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
