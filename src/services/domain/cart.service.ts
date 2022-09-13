import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cart } from "src/models/cart";
import { ProdutoDTO } from "src/models/produto.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService {

    constructor(public http:HttpClient,
        public storage: StorageService){

    }

    createOrCleanCart(): Cart {
        let cart: Cart = {items:[]};
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
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position == -1){
            cart.items.push({quantidade:1,produto : produto});
        }
        else {
            cart.items[position].quantidade +=1;
        }
        this.storage.setCart(cart);
        return cart;

    }

    removeFromCart(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items[position].quantidade -=1;
            if(cart.items[position].quantidade ==0) {
                cart.items.splice(position, 1);
            }
        }
        this.storage.setCart(cart);
        return cart;

    }
    total():number {
        let cart = this.getCart();
        let sum = 0;
        for(var i=0;i<cart.items.length;i++) {
            sum = sum + cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }

}