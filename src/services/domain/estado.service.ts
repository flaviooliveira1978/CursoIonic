import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/environments/environment";
import { EstadoDTO } from "src/models/estado.dto";


@Injectable()
export class EstadoService {

    constructor(public http:HttpClient){

    }
    findAll():Observable<EstadoDTO[]>{
        let endpoint = API_CONFIG.baseUrl +"/estados";
        return this.http.get<EstadoDTO[]>(endpoint);
    }
}