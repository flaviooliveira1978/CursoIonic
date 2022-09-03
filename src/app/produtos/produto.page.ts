import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { API_CONFIG } from 'src/environments/environment';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {
  public items : ProdutoDTO[];
  public cat: CategoriaDTO;
  public cat_id: string;
  public imgBaseUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public nav: NavController,
    public produto: ProdutoService,
    public activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(
      data => {
        this.cat_id = data.get("id");
      }
    );

    this.produto.findByCategoria(this.cat_id).subscribe(response => {
      this.cat = response;
      this.items = response.produtos;
      this.getProductsImages();
    },
    error=> {
      console.log("Erro ao buscar produtos!");
    });

  }
  getProductsImages(){


    for(var i = 0;i < this.items.length;i++){
      let item = this.items[i]; 
      this.produto.getSmallImageFromBucket(item.id.toString())
      .subscribe(
        response => {
          item.imageUrl = API_CONFIG.bucketBaseUrl+"/prod" +item.id+"-small.jpg";
          console.log("sucesso true: "+ item.imageUrl );

        },
        error =>{
          console.log("errors "+ error);

        });



       
    }
    
  }

  showDetail(){

  }



}
