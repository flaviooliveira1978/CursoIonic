import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Observable, throwError } from "rxjs";
import {catchError} from "rxjs/operators"
import { FieldMessage } from "src/models/fieldmessage";
import { StorageService } from "src/services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(public storage:StorageService,
        public alertCtrl:AlertController){

    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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

            switch(errorObj.status){
                case 403: 
                    this.handle403();
                break;
                case 401: 
                    this.handle401();
                break;
                case 422: 
                console.log('error: '+ JSON.stringify(errorObj.errors)); 
                this.handle422(errorObj.errors);
                break;
                default:
                    this.handleDefaultError(errorObj);
                break;
            }
            
            return throwError(errorObj);
          }))
    }
    handle401(){


        let alert = this.alertCtrl.create(
            {
            header:'401: Falha na autenticação',
            message: 'E-mail ou Senha inválidos!',
            buttons: ['OK']
        }
        ).then(res => {

            res.present();
      
          });
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    handle422(errorObj){
        let alert = this.alertCtrl.create(
            {
            header:'422: Falha inserindo usuário',
            message: this.listError(errorObj),
            buttons: ['OK']
        }
        ).then(res => {

            res.present();
      
          });
    }
    handleDefaultError(errorObj){
        let alert = this.alertCtrl.create(
            {
            header:errorObj.status + ' - '+ errorObj.error,
            message:errorObj.message,
            buttons: ['OK']
        }
        ).then(res => {

            res.present();
      
          });       

    }
    listError(messages: FieldMessage[]):string{
        let msg = "";
        
        for(var i=0; i < messages.length;i++){       
            msg = msg + "<p><strong>" + messages[i].fieldName + ":</strong> " +messages[i].message + "</p>";
        }

        return msg;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,

};