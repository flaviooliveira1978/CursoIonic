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
        title : "Home",
        url   : "/login",
        icon  : "home"
      },
      {
        title : "Categorias",
        url   : "/categorias",
        icon  : "list"
      },
      {
        title : "Profile",
        url   : "/profile",
        icon  : "person-circle-outline"
      },
    ]
  }
}
