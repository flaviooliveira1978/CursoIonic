import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { API_CONFIG } from 'src/environments/environment';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from 'src/services/storage.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})



export class ProfilePage implements OnInit {
  picture: string;
  cameraOn:boolean = false;

   options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  cliente : ClienteDTO;

  constructor(
    public storage: StorageService,
    public clienteService: ClienteService,
    public nav:NavController,
    public camera: Camera) { }

  ngOnInit() {

    let localUser = this.storage.getLocalUser()
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email).subscribe (
        response =>{
          this.cliente = response;
          this.getImageIfExists();         
        },
        error => {
          if (error.status == 403){
            this.nav.navigateRoot('login')
          }
        }
      );

    }
    else {
      this.nav.navigateRoot('login')
    }

  }

  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(
      response => {
        this.cliente.imageUrl = API_CONFIG.bucketBaseUrl+'/'+this.cliente.id+'.jpg'
      },
      error =>{});
  }



  takePhoto(){
    this.cameraOn = true;
  
    this.camera.getPicture(this.options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    this.picture = 'data:image/jpeg;base64,' + imageData;
    this.cameraOn = false;
    }, (err) => {
    // Handle error
    });
  }



}
