import { Component, Input } from '@angular/core';
import { Order } from '../../../models/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-information.component.html',
  styleUrl: './order-information.component.scss'
})
export class OrderInformationComponent {
  @Input() order: Order = new Order();

  getStatusString(statusNumber: number): string{
    switch(statusNumber){
      case 0: return 'In queue';
      case 1: return 'In transmit';
      case 2: return 'Success';
      case 3: return 'Canceled';
      default: return 'Unknown'
    }
  }
}
