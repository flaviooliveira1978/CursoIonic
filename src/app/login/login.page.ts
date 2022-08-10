import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public router:Router, public menu:MenuController,public nav:NavController) { 

  }

  ngOnInit() {
  }

  submit(){
   // this.router.navigateByUrl('categorias');

   this.nav.navigateRoot('categorias')
  }

  ionViewWillEnter(){
    this.menu.swipeGesture(false)
  }
  ionViewDidLeave(){
    this.menu.swipeGesture(true)
  }
  
}
