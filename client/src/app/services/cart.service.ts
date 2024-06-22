import { Injectable } from '@angular/core';
import { OrderDetail } from '../models/orderDetail';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: OrderDetail[] = [];
  private cartSubject = new BehaviorSubject<OrderDetail[]>([]);

  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  addProductToCart(product: Product, quantity: number = 1): void {
    const existingProduct = this.cart.find(item => item.product?.productId === product.productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      const newOrderDetail: OrderDetail = {
        productName: product.name,
        unitPrice: product.price,
        productId: product.productId?? '',
        quantity: quantity,
        product: product
      };
      this.cart.push(newOrderDetail);
    }
    this.saveCart();
    this.cartSubject.next(this.cart);
  }

  increaseProductQuantity(productId: string, quantity: number = 1): void {
    const product = this.cart.find(item => item.product?.productId === productId);
    if (product) {
      product.quantity += quantity;
      this.saveCart();
      this.cartSubject.next(this.cart);
    }
  }

  decreaseProductQuantity(productId: string, quantity: number = 1): void {
    console.log(productId);
    const product = this.cart.find(item => item.productId === productId);
    if (product) {
      if (product.quantity > quantity) {
        product.quantity -= quantity;
      } else {
        this.removeProductFromCart(productId);
      }
      this.saveCart();
      this.cartSubject.next(this.cart);
    }
  }

  removeProductFromCart(productId: string): void {
    this.cart = this.cart.filter(item => item.product?.productId !== productId);
    this.saveCart();
    this.cartSubject.next(this.cart);
  }



  private saveCart(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCart(): void {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.cartSubject.next(this.cart);
    }
  }

  clearCart(): void{
    this.cart = [];
    sessionStorage.removeItem('cart');
    this.cartSubject.next(this.cart);
  }

  getTotalValue(): number {
    const subTotal = this.cart.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
    return parseFloat(subTotal.toFixed(2));
  }
}
