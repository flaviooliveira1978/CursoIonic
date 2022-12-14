import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { ErrorInterceptorProvider } from 'src/interceptors/error-interceptor';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';
import { JwtModule } from '@auth0/angular-jwt';
import { ClienteService } from 'src/services/domain/cliente.service';
import { LOCALSTORAGE_KEYS } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutoService } from 'src/services/domain/produto.service';
import { CartService } from 'src/services/domain/cart.service';
import { PedidoService } from 'src/services/domain/pedido.service';
import { ImageUtilService } from 'src/services/image-util.service';



export function tokenGetter() {


    let usr = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.localUser));
    if (usr) {
      return usr.token;
    }
    else {
      return null;
    }

}



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["curso-env.eba-pibppwgk.us-east-2.elasticbeanstalk.com"],
        disallowedRoutes: ["http://curso-env.eba-pibppwgk.us-east-2.elasticbeanstalk.com/login"],
      },
    }),
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
],
  providers: [{ provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy }, 
    CategoriaService, 
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService,
    CartService,
    PedidoService,
    ImageUtilService,
    ErrorInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
