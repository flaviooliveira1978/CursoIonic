import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/environments/environment";
import { ClienteDTO } from "src/models/cliente.dto";


@Injectable()
export class ClienteService {


    constructor(public http: HttpClient){

    }


    findByEmail(email : string): Observable<ClienteDTO>{
        return this.http.get<ClienteDTO>(API_CONFIG.baseUrl + '/clientes/email?email='+email);       

    }

    getImageFromBucket(id:string) : Observable<any> {
        return this.http.get(API_CONFIG.bucketBaseUrl+'/'+id+'.jpg',{responseType : 'blob'});

    }
}