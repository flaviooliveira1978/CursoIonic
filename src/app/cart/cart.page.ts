import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from 'src/environments/environment';
import { CartItem } from 'src/models/cart-item';
import { ProdutoService } from 'src/services/domain/produto.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public items: CartItem[];

  constructor(public cartService:CartService,
    public produtoService:ProdutoService) { }

  ngOnInit() {
    let cart = this.cartService.getCart();
    console.log("carrinho: "+JSON.stringify(cart.items));
    this.items = cart.items;
    this.getProductsImages();
  }


  getProductsImages(){

    for(var i = 0;i < this.items.length;i++){
      let item = this.items[i]; 
      this.produtoService.getSmallImageFromBucket(item.produto.id.toString())
      .subscribe(
        response => {
          item.produto.imageUrl = API_CONFIG.bucketBaseUrl+"/prod" +item.produto.id+"-small.jpg";
          console.log("sucesso true: "+ item.produto.imageUrl );

        },
        error =>{
          console.log("errors "+ error);

        });
       
    }
    
  }
}
