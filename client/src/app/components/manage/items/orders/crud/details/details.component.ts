import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderInformationComponent } from '../../../../../shares/order-information/order-information.component';
import { Order } from '../../../../../../models/order';

@Component({
  selector: 'history-details',
  standalone: true,
  imports: [OrderInformationComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  @Output() switchToListViewFunc: EventEmitter<any> = new EventEmitter();
  @Input() order: Order = new Order();

  switchToListView(): void {
    this.switchToListViewFunc.emit();
  }
  
  showOrder(){
    console.log('orderhere');
    console.log(this.order);
  }
} 
