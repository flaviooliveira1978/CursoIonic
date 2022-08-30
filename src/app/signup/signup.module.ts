import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { EstadoService } from 'src/services/domain/estado.service';
import { CidadeService } from 'src/services/domain/cidade.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignupPageRoutingModule
  ],
  providers:[
    CidadeService,
    EstadoService
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
