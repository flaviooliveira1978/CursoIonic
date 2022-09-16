import { EnderecoDTO } from "./endereco.dto";

export interface  ClienteDTO {

    id? : string;
    nome? : string;
    email? : string;
    imageUrl? : string;
    cpfOuCnpj?: string;
    tipo?: string;
    enderecos?:EnderecoDTO[];

}