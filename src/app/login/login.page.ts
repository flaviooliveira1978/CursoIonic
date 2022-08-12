import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  creds : CredenciaisDTO = {
    email:"",
    senha:""

  };

  constructor(public router:Router, public menu:MenuController,public nav:NavController) { 

  }

  ngOnInit() {
  }

  login(){
   // this.router.navigateByUrl('categorias');
   console.log(this.creds);
   this.nav.navigateRoot('categorias')
  }

  ionViewWillEnter(){
    this.menu.swipeGesture(false)
  }
  ionViewDidLeave(){
    this.menu.swipeGesture(true)
  }
  
}
