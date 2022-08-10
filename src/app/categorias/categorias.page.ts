import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CategoriaService } from 'src/services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(public nav:NavController,
    public categoriaService:CategoriaService) {     

  }
  ngOnInit() {
  }

  ionViewDidEnter(){
    this.categoriaService.findAll().subscribe(response => {
      console.log(response)
    });
  }

}
