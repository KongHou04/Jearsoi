import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderDetail } from '../../models/orderDetail';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit{
  id: string | null = null;
  order: Order | null = null;
  
  constructor(private route: ActivatedRoute, private productService: ProductService, private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.id = idParam;
      console.log('ID from route:', this.id);
    });
    if (this.id != null)
      this.getOrderById(this.id);
  }

  searchOrder(id: string){
    if (id != null) {
      // Điều hướng đến route với ID mới
      this.router.navigate(['/history', id]);
    }
  }

  getOrderById(id: string){
    this.orderService.getOrderById(id).subscribe({
      next: (response) => {
        if (response.isSuccess==true && response.data != null)
          this.order = response.data;
      }
    });
  }

  clearData(){
    this.id = null;
    this.order = new Order();
  }

  getImgUrl(imgUrl?: string): string {
    if (imgUrl != undefined)
      return this.productService.getImgUrl(imgUrl);
    return '';
  }
}
