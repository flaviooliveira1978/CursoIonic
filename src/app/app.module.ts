import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaService } from 'src/services/domain/categoria.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule,IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CategoriaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
