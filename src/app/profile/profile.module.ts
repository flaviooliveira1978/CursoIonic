import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { ImageUtilService } from 'src/services/image-util.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  providers: [
    Camera
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
