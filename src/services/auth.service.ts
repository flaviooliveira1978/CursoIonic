import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { API_CONFIG } from "src/environments/environment";
import { CredenciaisDTO } from "src/models/credenciais.dto";
import { LocalUser } from "src/models/local_user";
import { CartService } from "./domain/cart.service";
import { StorageService } from "./storage.service";


@Injectable()
export class AuthService {

    endpointLogin = API_CONFIG.baseUrl + '/login';
    endpointRefreshToken = API_CONFIG.baseUrl + '/auth/refresh_token';

    helper: JwtHelperService = new JwtHelperService();


    contentHeader = new HttpHeaders({"Content-Type": "application/json"});

    constructor(public http:HttpClient, 
        public storage: StorageService,
        public cartService: CartService){
    }

    authenticate(user: CredenciaisDTO): Observable<any> {
        return this.http.post<CredenciaisDTO>(this.endpointLogin, JSON.stringify(user), 
        { headers: this.contentHeader, observe: 'response'});
    }

    refreshToken(): Observable<any> {
        return this.http.post(this.endpointRefreshToken,'', 
        { headers: this.contentHeader, observe: 'response'});
      }

    successfulLogin(authorizationValue:string){
        
        let usr : LocalUser = {
            token: authorizationValue.substring(7),
            email: this.getUserFromJwt(authorizationValue)
        };

        console.log('usuario logado jwt: '+  usr.email);
        console.log('token jwt: '+  usr.token);
        this.storage.setLocalUser(usr);
        this.cartService.createOrCleanCart();

    }
    logout(){
        this.storage.setLocalUser(null);

    } 

    getUserFromJwt(myRawToken: string):string {
    
        return this.helper.decodeToken(myRawToken).sub;
    }


}

