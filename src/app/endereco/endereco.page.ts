import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { EnderecoDTO } from 'src/models/endereco.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage implements OnInit {

  public items: EnderecoDTO[];



  public addressForm = new FormGroup({
    id : new FormControl(1,Validators.required)
  });

  constructor(public storage:StorageService,
              public clienteService:ClienteService,
              public nav:NavController,
              public cartService: CartService) { }

  ngOnInit() {

  }

  ionViewDidEnter() {

      let localUser = this.storage.getLocalUser()
      if(localUser && localUser.email){
        this.clienteService.findByEmail(localUser.email).subscribe (
          response =>{
            this.items = <EnderecoDTO[]>response['enderecos'];
          
          },
          error => {
            if (error.status == 403){
              this.nav.navigateRoot('login')
            }
          }
        );
  
      }
      else {
        this.nav.navigateRoot('login')
      }


  }
  goOn(){


    this.cartService.setAddress(<EnderecoDTO>this.addressForm.value);
    this.nav.navigateForward("pagamento");
  }
  //function to print what is inputed in the form that is declared above
checkValue(event) { 
  console.log(event.detail.value)
}

}
