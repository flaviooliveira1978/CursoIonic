import { LOCALSTORAGE_KEYS } from "src/environments/environment";
import { Cart } from "src/models/cart";
import { LocalUser } from "src/models/local_user";

export class StorageService {

    setLocalUser(obj:LocalUser){

        console.log('setLocalUser: '+ obj);
        if(obj == null){
            localStorage.removeItem(LOCALSTORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(LOCALSTORAGE_KEYS.localUser,JSON.stringify(obj));
        }
    }
    getLocalUser():LocalUser{
        let usr = localStorage.getItem(LOCALSTORAGE_KEYS.localUser);
        if(usr == null){
            return null;
        }
        else {
            return JSON.parse(usr);
        }

    }

    setCart(obj:Cart){

        console.log('setLocalUser: '+ JSON.stringify(obj));
        
        if(obj == null){
            localStorage.removeItem(LOCALSTORAGE_KEYS.cart);
        }
        else {
            localStorage.setItem(LOCALSTORAGE_KEYS.cart,JSON.stringify(obj));
        }
    }
    getCart():Cart{
        let cart = localStorage.getItem(LOCALSTORAGE_KEYS.cart);
        if(cart == null){
            return null;
        }
        else {
            return JSON.parse(cart);
        }

    }
}