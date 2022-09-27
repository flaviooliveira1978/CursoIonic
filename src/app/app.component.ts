import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any;
  constructor(public http: HttpClient) {
    this.sideMenu();
  }



  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Profile",
        url   : "/profile",
        icon  : "person-circle-outline"
      },
      {
        title : "Categorias",
        url   : "/categorias",
        icon  : "list"
      },
      {
        title : "Carrinho",
        url   : "/cart",
        icon  : "cart"
      },
      {
        title : "Logout",
        url   : "/logout",
        icon  : "exit-outline"
      },

    ]
  }
}
