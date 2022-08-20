import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { API_CONFIG } from "src/environments/environment";
import { CredenciaisDTO } from "src/models/credenciais.dto";


@Injectable()
export class AuthService {

    endpoint = API_CONFIG.baseUrl + '/login';


    contentHeader = new HttpHeaders({"Content-Type": "application/json"});

    constructor(public http:HttpClient){
    }
  
    authenticate(user: CredenciaisDTO): Observable<any> {
        return this.http.post<CredenciaisDTO>(this.endpoint, JSON.stringify(user), 
        { headers: this.contentHeader, observe: 'response'});
      }
}

