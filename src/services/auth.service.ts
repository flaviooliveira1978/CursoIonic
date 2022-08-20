import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { API_CONFIG } from "src/environments/environment";
import { CredenciaisDTO } from "src/models/credenciais.dto";
import { LocalUser } from "src/models/local_user";
import { StorageService } from "./storage.service";


@Injectable()
export class AuthService {

    endpoint = API_CONFIG.baseUrl + '/login';


    contentHeader = new HttpHeaders({"Content-Type": "application/json"});

    constructor(public http:HttpClient, public storage: StorageService){
    }
  
    authenticate(user: CredenciaisDTO): Observable<any> {
        return this.http.post<CredenciaisDTO>(this.endpoint, JSON.stringify(user), 
        { headers: this.contentHeader, observe: 'response'});
      }

    successfulLogin(authorizationValue:string){
        console.log('success: ' +authorizationValue);
        let tokenValue = authorizationValue.substring(7);
        let usr : LocalUser = {
            token:tokenValue
        };
        this.storage.setLocalUser(usr);
    }
    logout(){
        this.storage.setLocalUser(null);

    }
}

