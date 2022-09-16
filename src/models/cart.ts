import { CartItem } from "./cart-item";
import { EnderecoDTO } from "./endereco.dto";

export interface Cart {
    endereco:EnderecoDTO;
    items: CartItem[]
}