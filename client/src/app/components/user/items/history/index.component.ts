import { Component } from '@angular/core';
import { ListComponent } from './crud/list/list.component';
import { DetailsComponent } from './crud/details/details.component';
import { CommonModule } from '@angular/common';
import { OrderInformationComponent } from '../../../shares/order-information/order-information.component';
import { Order } from '../../../../models/order';

@Component({
  selector: 'history-manage-board',
  standalone: true,
  imports: [CommonModule, ListComponent, DetailsComponent, OrderInformationComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class HistoryManageComponent {
  selectedOrder: Order = new Order();
  view: string = 'list';

  setView(view: string){
    this.view = view;
  }

  switchToDetails(order: any) {
    console.log('mamam');
    this.selectedOrder = order;
    this.setView('details');
  }
}
