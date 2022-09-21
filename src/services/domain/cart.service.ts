import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cart } from "src/models/cart";
import { EnderecoDTO } from "src/models/endereco.dto";
import { ProdutoDTO } from "src/models/produto.dto";
import { PagamentoDTO } from "src/models/pagamento.dto";
import { StorageService } from "../storage.service";


@Injectable()
export class CartService {

    constructor(public http:HttpClient,
        public storage: StorageService){

    }

    createOrCleanCart(): Cart {
        let cart: Cart = {cliente:null,enderecoDeEntrega:null,pagamento:null,itens:[]};
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart{
        let cart: Cart =  this.storage.getCart();
        if(cart==null){
            cart = this.createOrCleanCart();
        }
        return cart;
    }

    addToCart(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if(position == -1){
            cart.itens.push({quantidade:1,produto : produto});
        }
        else {
            cart.itens[position].quantidade +=1;
        }
        this.storage.setCart(cart);
        return cart;

    }

    removeFromCart(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.itens[position].quantidade -=1;
            if(cart.itens[position].quantidade ==0) {
                cart.itens.splice(position, 1);
            }
        }
        this.storage.setCart(cart);
        return cart;

    }
    total():number {
        let cart = this.getCart();
        let sum = 0;
        for(var i=0;i<cart.itens.length;i++) {
            sum = sum + cart.itens[i].produto.preco * cart.itens[i].quantidade;
        }
        return sum;
    }

    setAddress(end: EnderecoDTO): Cart{
        let cart = this.getCart();
        cart.enderecoDeEntrega = end;
        console.log("end:"+ JSON.stringify(end));
        this.storage.setCart(cart);
        return cart;
    }

    setPayment(payment: PagamentoDTO): Cart{
        let cart = this.getCart();
        cart.pagamento = payment;
        this.storage.setCart(cart);
        return cart;
    }

}