import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/environments/environment";
import { CategoriaDTO } from "src/models/categoria.dto";

@Injectable()
export class CategoriaService {

    constructor(public http:HttpClient){

    }
    findAll():Observable<CategoriaDTO[]>{
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }

    ping() {
        console.log('--> vair entrar no ping clientes');
        this.http.get(API_CONFIG.baseUrl + '/clientes/1').subscribe(
            (data) => console.log(data),
            (err) => console.log(err)
        );

  }
}