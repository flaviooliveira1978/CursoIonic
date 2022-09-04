import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_CONFIG } from 'src/environments/environment';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  public produto_id: string;
  public produto:ProdutoDTO;

  constructor(public produtoService:ProdutoService,
    public activatedRoute:ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(
      data => {
        this.produto_id = data.get("id");
      }
    );

    this.produtoService.getProductDetail(this.produto_id).subscribe(
      response => {
        this.produto = response;
        this.produto.imageUrl = API_CONFIG.bucketBaseUrl+"/prod" +this.produto_id+".jpg";
      },
      error =>{
        console.log("Erro obtande detalhe de produto: "+this.produto_id + " - " + error);
      }
    );

  }

}
