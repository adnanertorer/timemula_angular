import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { CashBoxTransactionModel } from '../model/cash-box-transaction-model';
import { CashboxFilterModel } from '../model/cashbox-filter-model';

@Injectable({
  providedIn: 'root'
})
export class CashBoxTransactionService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/CashBoxTransaction/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: CashBoxTransactionModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/CashBoxTransaction/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: CashBoxTransactionModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/CashBoxTransaction/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/CashBoxTransaction/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/CashBoxTransaction/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getByFilter(resource: CashboxFilterModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/CashBoxTransaction/ListByFilter`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getTransactionTypes(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/CashBoxTransaction/TransactionTypes`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
