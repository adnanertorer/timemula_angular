import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { PaymentFilterModel } from '../model/payment-filter-model';
import { PaymentModel } from '../model/payment-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/Payment/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListByFilter(filter: PaymentFilterModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/Payment/ListByFilter`, filter)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: PaymentModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/Payment/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: PaymentModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/Payment/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/Payment/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/Payment/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
