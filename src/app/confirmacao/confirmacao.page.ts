import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Cart } from 'src/models/cart';
import { CartItem } from 'src/models/cart-item';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { PagamentoDTO } from 'src/models/pagamento.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { PedidoService } from 'src/services/domain/pedido.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.page.html',
  styleUrls: ['./confirmacao.page.scss'],
})
export class ConfirmacaoPage implements OnInit {

  public cart : Cart;
  public endereco: EnderecoDTO;
  public items: CartItem[];
  public pagamento: PagamentoDTO;

  constructor(public nav : NavController,
              public clientService: ClienteService,
              public cartService: CartService,
              public storage: StorageService,
              public pedidoService: PedidoService) {

   }


   ionViewDidEnter(){
  }
  
  ngOnInit() {


    this.cart = this.cartService.getCart();
    this.items = this.cart.itens;
    this.pagamento = this.cart.pagamento;


    let localUser = this.storage.getLocalUser()
    if(localUser && localUser.email){
      this.clientService.findByEmail(localUser.email).subscribe (
        response =>{         
          this.endereco = this.getAddress(response['enderecos'],this.cart.enderecoDeEntrega.id );
          this.cart.cliente = response;
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

  getAddress(enderecos:EnderecoDTO[],id: number): EnderecoDTO{

    let position = enderecos.findIndex(x => x.id == id);
    if(position == -1){
        return null;
    }
    else {
      return enderecos[position];
    }

  }

  total():number{
    return this.cartService.total();
  }

  finalizarPedido(){
    console.log("pedido: "+ JSON.stringify(this.cart));

    this.pedidoService.insert(this.cart).subscribe(
      (response: HttpResponse<any> )=> {
        console.log("pedido inserido com sucesso: "+ response.headers.get('location'));
        this.cartService.createOrCleanCart();
        this.nav.navigateRoot('categorias');
        response.headers
        .keys()
        .forEach(keyName =>
          console.log(
            `The value of the ${keyName} header is: ${response.headers.get(
              keyName
            )}`
          )
        );

      },
      error => {
        console.log("erro: "+ error);
      }
    )


  }
  

}


/*
        response.headers
        .keys()
        .forEach(keyName =>
          console.log(
            `The value of the ${keyName} header is: ${response.headers.get(
              keyName
            )}`
          )
        );
        
        */
