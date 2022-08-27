import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public authService: AuthService,
    public nav: NavController) { }

  ngOnInit() {
    this.authService.logout();
    this.nav.navigateRoot('login');

  }

}
