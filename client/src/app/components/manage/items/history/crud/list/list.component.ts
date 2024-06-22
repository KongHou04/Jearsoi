import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderService } from '../../../../../../services/order.service';
import { Order } from '../../../../../../models/order';

@Component({
  selector: 'history-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  @Output() switchToDetailsViewFunc: EventEmitter<any> = new EventEmitter();
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  switchToDetailsView(order: Order): void {
    console.log('noway')
    console.log(order);
    this.switchToDetailsViewFunc.emit(order);
    console.log(order);
  }

  loadHistory(): void{
    this.orderService.getHistoryOrders().subscribe(
      {
        next: (response) => {
          this.orders = response.data || [];
          console.log('data form history');
          console.table(this.orders);
        },
        error: (error) => {
        },
        complete: () => {
        }
      }
    );
  }
}
