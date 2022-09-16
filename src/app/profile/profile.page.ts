import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { API_CONFIG } from 'src/environments/environment';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente : ClienteDTO;

  constructor(
    public storage: StorageService,
    public clienteService: ClienteService,
    public nav:NavController) { }

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

}
