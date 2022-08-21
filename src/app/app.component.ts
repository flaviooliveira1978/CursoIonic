import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { API_CONFIG } from 'src/environments/environment';

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
        title : "Home",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "Categorias",
        url   : "/categorias",
        icon  : "list"
      },
      {
        title : "Produtos",
        url   : "/produtos",
        icon  : "cart"
      },
    ]
  }
}
