import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/auth.service';

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

  constructor(
    public router:Router, 
    public menu:MenuController,
    public nav:NavController,
    public auth:AuthService) { 

  }

  ngOnInit() {
  }

  login(){

   this.auth.authenticate(this.creds).subscribe(response => {
    console.log('OK: vai pra successFul');
    this.auth.successfulLogin(response.headers.get('Authorization'));
    this.nav.navigateRoot('categorias')
  },
  error=> {
    console.log('Acesso Negado!')
  });
  
  }

  ionViewWillEnter(){
    this.menu.swipeGesture(false)
  }
  ionViewDidLeave(){
    this.menu.swipeGesture(true)
  }
  
}
