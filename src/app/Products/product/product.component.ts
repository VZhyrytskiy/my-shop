import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponentComponent {

  constructor() { }

  onAddToCart(){
      console.log("product was bought")
  }

}
