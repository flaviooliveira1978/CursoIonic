import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/environments/environment";
import { ClienteDTO } from "src/models/cliente.dto";
import { ImageUtilService } from "../image-util.service";


@Injectable()
export class ClienteService {

    contentHeader = new HttpHeaders({"Content-Type": "application/json"});
    
    constructor(public http: HttpClient,public imgUtil:ImageUtilService){

    }


    findById(id : string) {
        return this.http.get(API_CONFIG.baseUrl + '/clientes/'+id);       

    }

    findByEmail(email : string) {
        return this.http.get(API_CONFIG.baseUrl + '/clientes/email?email='+email);       

    }

    getImageFromBucket(id:string) : Observable<any> {
        return this.http.get(API_CONFIG.bucketBaseUrl+'/'+id+'.jpg',{responseType : 'blob'});

    }

    insert(obj:ClienteDTO){
        return this.http.post(API_CONFIG.baseUrl + '/clientes', JSON.stringify(obj), 
        { headers: this.contentHeader, observe: 'response'});

    }
    uploadPhoto(obj){
        let pictureBlob = this.imgUtil.dataUriToBlob(obj);
        let formData : FormData = new FormData();

        formData.set('file',pictureBlob, 'file.png');

        return this.http.post(API_CONFIG.baseUrl + '/clientes/picture', formData, 
        { observe: 'response'});

    }
}