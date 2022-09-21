
import { CartItem } from "./cart-item";
import { ClienteDTO } from "./cliente.dto";
import { EnderecoDTO } from "./endereco.dto";
import { PagamentoDTO } from "./pagamento.dto";

export interface Cart {
    cliente:ClienteDTO;
    enderecoDeEntrega:EnderecoDTO;
    pagamento: PagamentoDTO;
    itens: CartItem[]
}