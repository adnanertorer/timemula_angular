import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          console.log(request);
          this.authService.clearLocalStorage();
          this.router.navigate([''], {
            queryParams: { returnUrl: this.router.routerState.snapshot.url },
          });
        }

        if (err.status === 400) {
          console.log(err.error.isValid);
          if(err.error.isValid != undefined){
            let errorMessage = 'Lütfen aşağıda belirtilen hataları düzeltin\n\n';
            var errors = err.error.errors;
            errors.forEach(element => {
              errorMessage += element.errorMessage+'\n';
            });
           /* for (let index = 0; index < err.error.errors.length; index++) {
              errorMessage += err.error.errors[index].errorMessage+'\n';
            }*/
            console.log(errorMessage);
            alert(errorMessage);
          }
          
        }

        if (!environment.production) {
         // console.error(err);
        }
        const error = (err && err.error && err.error.message) || err.statusText;
        return throwError(error);
      })
    );
  }
}