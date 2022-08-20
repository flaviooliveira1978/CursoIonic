import { LOCALSTORAGE_KEYS } from "src/environments/environment";
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
        let usr = localStorage.getItemItem(LOCALSTORAGE_KEYS.localUser);
        if(usr == null){
            return null;
        }
        else {
            return JSON.parse(usr);
        }

    }

}