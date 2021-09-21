import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartModel } from 'src/app/models/cart.model';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/Products/products.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {
  products: CartModel[] = [];

  private sub!: Subscription;
  constructor(private productService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
    this.sub = this.productService.channel$.subscribe(
      data => this.addProduct(data)
    );
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  private addProduct(product: CartModel) {
    let cartProduct = this.products.find(x => x.name === product.name);
    if (!cartProduct) {
      this.cartService.getProducts().push(product);
    } else {
      cartProduct.quantity += 1
    }

  }
  trackByName(index: number, item: ProductModel): string {
    return item.name;
  }

  getProductsCount(): number {
    return this.cartService.getProductsCount();
  }
  getProductSummary(): number {
    return this.cartService.getProductSummary();
  }

  onDeleteFromCart(product: CartModel): void {
    this.cartService.deleteProductFromCart(product);
    this.products = this.cartService.getProducts();
  }
}
