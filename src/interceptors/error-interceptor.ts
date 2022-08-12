import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {catchError} from "rxjs/operators"

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("passou");
        return next.handle(req)
        .pipe(
          catchError((error) => {

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }
            console.log('Erro detectado pelo Interceptor'); 
            return throwError(errorObj);
          }))
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,

};