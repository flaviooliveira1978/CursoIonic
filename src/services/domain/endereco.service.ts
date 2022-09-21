import { HttpClient } from "@angular/common/http";
import { EnderecoDTO } from "src/models/endereco.dto";

export class EnderecoService{

    constructor(public http: HttpClient){

    }

    findById(id:string):EnderecoDTO {

        return null;
        
    }
}