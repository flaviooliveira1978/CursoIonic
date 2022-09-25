import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, NavParams } from '@ionic/angular';

import { API_CONFIG } from 'src/environments/environment';

import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {
  public items : ProdutoDTO[] = [];
  public page: number = 0;

  public cat_id: string;
  public imgBaseUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public nav: NavController,
    public produto: ProdutoService,
    public activatedRoute: ActivatedRoute,
    public loadingController: LoadingController

  ) { }

  async ngOnInit() {

    this.activatedRoute.paramMap.subscribe(
      data => {this.cat_id = data.get("id")});
    this.loadData();
 
  }

  getProductsImages(start:number, end:number){

    for(var i = start;i < end;i++){
      let item = this.items[i]; 
      this.produto.getSmallImageFromBucket(item.id.toString())
      .subscribe(
        response => {
          item.imageUrl = API_CONFIG.bucketBaseUrl+"/prod" +item.id+"-small.jpg";

        },
        error =>{
          console.log("errors "+ error);

        }); 
    }
    
  }

  showDetail(id){
    this.nav.navigateForward('product-detail/'+id);
  }

  async loadData(){

    const loading = await this.loadingController.create({message: 'Aguarde...'});
    await loading.present();

    this.produto.findByCategoria(this.cat_id,this.page,10).subscribe(
      response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']);
      let end = this.items.length;
      this.getProductsImages(start,end);
    },
      error=> {
      console.log("Erro ao buscar produtos!");


    });

    await loading.dismiss();
  }

  doRefresh(event){
    this.items = [];
    this.page=0;
    this.loadData();
    setTimeout(()=> {
      event.target.complete();
    },1000);
  }


  infiniteScroll(event){
    this.page++;
    this.loadData();
    setTimeout(()=> {
      event.target.complete();
    },1000);
  }

}
