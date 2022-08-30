import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/environments/environment";
import { CidadeDTO } from "src/models/cidade.dto";


@Injectable()
export class CidadeService {

    constructor(public http:HttpClient){

    }
    findAll(id:string):Observable<CidadeDTO[]>{
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${id}/cidades`);
    }
}