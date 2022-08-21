import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { API_CONFIG } from 'src/environments/environment';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { CategoriaService } from 'src/services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  public items : CategoriaDTO[];
  public imgBaseUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(public nav:NavController,
    public categoriaService:CategoriaService) {     

  }
  ngOnInit() {

  }

  ionViewDidEnter(){
    this.categoriaService.findAll().subscribe(response => {
      this.items = response;
    },
    error=> {});
    this.categoriaService.ping();
  }

}
