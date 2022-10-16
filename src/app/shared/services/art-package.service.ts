import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ArtPackageModel } from '../model/art-package-model';
import { BaseResponse } from '../model/BaseResponse';

@Injectable({
  providedIn: 'root'
})
export class ArtPackageService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(categoryId: number, subCategoryId: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ArtPackage/List/?categoryId=${categoryId.toString()}&subCategoryId=${subCategoryId.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListByLesson(lessonId: Number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ArtPackage/ListByLesson/?lessonId=${lessonId.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListAll(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ArtPackage/ListAll/`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: ArtPackageModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/ArtPackage/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: ArtPackageModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/ArtPackage/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ArtPackage/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/ArtPackage/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
