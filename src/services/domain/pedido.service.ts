import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "src/environments/environment";
import { Cart } from "src/models/cart";



@Injectable()
export class PedidoService{





    contentHeader = new HttpHeaders({"Content-Type": "application/json"});

    constructor(public http:HttpClient){

    }
    insert(cart:Cart){
        return this.http.post(API_CONFIG.baseUrl + '/pedidos', JSON.stringify(cart), 
            { headers: this.contentHeader, observe: 'response', responseType: 'text'});
    }

}