import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderDetail } from '../../models/orderDetail';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cart: Order = {
    phone: '',
    address: '',
    subTotal: 0,
    note: undefined,
    discount: 1,
    deliveryStatus: 0,
    total: 0,
    orderDetails: [],
    paymentStatus: 0
  }
  customer: any = {
    name: '',
    phone: '',
    address: '',
    note: ''
  }
  
  constructor(private cartService: CartService, private productService: ProductService, private orderService: OrderService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart: OrderDetail[]) => {
      this.cart.orderDetails = cart;
      this.cart.subTotal = this.cartService.getTotalValue();
      this.getTotal();
    });
    this.userService.user$.subscribe(user => {
      this.cart.phone = user?.phoneNumber!;
      this.cart.email = user?.email;
    });
  }

  increaseProductQuantity(productId: string): void{
    this.cartService.increaseProductQuantity(productId);
  }

  decreaseProductQuantity(productId: string): void{
    console.log('descreasing');
    console.log(productId);
    this.cartService.decreaseProductQuantity(productId);
  }

  removeProductFromCart(productId: string): void{
    this.cartService.removeProductFromCart(productId);
  }

  getImgUrl(imgUrl?: string): string {
    if (imgUrl != undefined)
      return this.productService.getImgUrl(imgUrl);
    return '';
  }

  getTotal() : void{
    this.cart.total = this.cart.subTotal - this.cart.discount;
    this.cart.total = parseFloat(this.cart.total.toFixed(2))
    if (this.cart.total < 0) this.cart.total = 0;
  }


  sendOrder(): void{
    console.log('sending');
    this.orderService.addOrder(this.cart).subscribe({
      next: (response) =>{
        console.log(response.msg);
        if (response.isSuccess == true){
          this.cart = new Order();
          this.cartService.clearCart();
          this.router.navigate(['/history', response.data?.orderId]);
        }
      },
      error: (error) => {
      },
      complete: () => {
      }
    });
  }
}
