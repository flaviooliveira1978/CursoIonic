import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CartService } from 'src/services/domain/cart.service';


@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

  public parcelas: number[]=[1,2,3,4,5,6,7,8,9,10];


  public paymentForm = new FormGroup({
    numeroDeParcelas: new FormControl(1,Validators.required),
    '@type': new FormControl(["pagamentoComCartao",Validators.required])
  });


  constructor(public nav:NavController,
              public alertCtrl: AlertController,
              public cartService: CartService,
              public activatedRoute: ActivatedRoute) { }


  ngOnInit() {


  }


    //function to print what is inputed in the form that is declared above
  checkValue(event) { 
    console.log(event.detail.value)
  }
  goOn(){
    console.log("pagamento: "+ JSON.stringify(this.paymentForm.value));

    this.cartService.setPayment(<any>this.paymentForm.value);

    this.nav.navigateRoot("confirmacao");
  }

}
