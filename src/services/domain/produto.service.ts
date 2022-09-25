import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/environments/environment";
import { CategoriaDTO } from "src/models/categoria.dto";
import { ProdutoDTO } from "src/models/produto.dto";

@Injectable()
export class ProdutoService {

    constructor(public http:HttpClient){
    }

    findByCategoria(id: string, page: number = 0, size : number = 10 ):Observable<CategoriaDTO>{
        return this.http.get<CategoriaDTO>(API_CONFIG.baseUrl+'/produtos?categorias='+id +'&page='+page+'&linesPerPage='+size);
    }

    getSmallImageFromBucket(id:string) : Observable<any> {
        let url = API_CONFIG.bucketBaseUrl+"/prod" +id+"-small.jpg";
        return this.http.get(url, {responseType : 'blob'});
    }

    getProductDetail(id: string):Observable<ProdutoDTO>{
        return this.http.get<ProdutoDTO>(API_CONFIG.baseUrl+'/produtos/'+id);
    }

    getImageFromBucket(id:string) : Observable<any> {
        let url = API_CONFIG.bucketBaseUrl+"/prod" +id+".jpg";
        return this.http.get(url, {responseType : 'blob'});      
    }
}
