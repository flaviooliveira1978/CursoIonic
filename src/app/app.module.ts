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



export function tokenGetter() {


    let usr = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.localUser));
    return usr.token;

}



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: ["http://localhost:8080/login"],
      },
    }),
    IonicModule.forRoot(), 
    AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy }, 
    CategoriaService, 
    AuthService,
    StorageService,
    ClienteService,
    ErrorInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
