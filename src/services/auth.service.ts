import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { API_CONFIG } from "src/environments/environment";
import { CredenciaisDTO } from "src/models/credenciais.dto";
import { LocalUser } from "src/models/local_user";
import { StorageService } from "./storage.service";


@Injectable()
export class AuthService {

    endpoint = API_CONFIG.baseUrl + '/login';

    helper: JwtHelperService = new JwtHelperService();


    contentHeader = new HttpHeaders({"Content-Type": "application/json"});

    constructor(public http:HttpClient, public storage: StorageService){
    }
  
    authenticate(user: CredenciaisDTO): Observable<any> {
        return this.http.post<CredenciaisDTO>(this.endpoint, JSON.stringify(user), 
        { headers: this.contentHeader, observe: 'response'});
      }

    successfulLogin(authorizationValue:string){
        
        localStorage.setItem("access_token",authorizationValue.substring(7))

        let usr : LocalUser = {
            token: authorizationValue.substring(7),
            email: this.getUserFromJwt(authorizationValue)
        };
        localStorage.setItem("access_token",usr.token)

        console.log('usuario logado jwt: '+  usr.email);
        console.log('token jwt: '+  usr.token);
        this.storage.setLocalUser(usr);
    }
    logout(){
        this.storage.setLocalUser(null);

    }

    getUserFromJwt(myRawToken: string):string {
    
        return this.helper.decodeToken(myRawToken).sub;
    }
}

