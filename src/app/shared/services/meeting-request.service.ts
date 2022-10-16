import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { MeetingRequestModel } from '../model/meeting-request-model';

@Injectable({
  providedIn: 'root'
})
export class MeetingRequestService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/MeetingRequest/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: MeetingRequestModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/MeetingRequest/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: MeetingRequestModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/MeetingRequest/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/MeetingRequest/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/MeetingRequest/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  setIsDone(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/MeetingRequest/SetDone/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }
}
