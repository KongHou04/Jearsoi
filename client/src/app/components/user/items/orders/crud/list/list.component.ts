import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { OrderService } from '../../../../../../services/order.service';
import { Order } from '../../../../../../models/order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'history-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  @ViewChild('deleteConfirmModal') deleteConfirmModal!: TemplateRef<any>;
  @ViewChild('payConfirmModal') payConfirmModal!: TemplateRef<any>;
  @ViewChild('deliverConfirmModal') deliverConfirmModal!: TemplateRef<any>;
  @Output() switchToDetailsViewFunc: EventEmitter<any> = new EventEmitter();
  orders: Order[] = [];
  selectedOrder: Order = new Order();
  keyName: string = '';
  sortOption: string = 'timeAsc';
  statusFiltOption: string = 'all';
  page: number = 1;
  itemsPerPage: number = 10;
  maxPageNumber: number = 1;
  private searchTerms = new Subject<string>();

  constructor(public orderService: OrderService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadOrders();
    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(term => term.trim())
    ).subscribe(term => this.filterOrders(term));
  }

  switchToDetailsView(order: any): void {
    this.switchToDetailsViewFunc.emit(order);
  }

  openDeliverModal(event: Event, order: Order): void {
    event?.stopPropagation();
    this.selectedOrder = order;
    this.modalService.open(this.deliverConfirmModal, { ariaLabelledBy: 'modal-basic-title' });
  }
  confirmDeliver(modal: any, callback: (status: number, id?: string) => void): void {
    console.log(this.selectedOrder);
    callback(1, this.selectedOrder?.orderId);
    modal.close();
  }

  openPayModal(event: Event, order: Order): void {
    event?.stopPropagation();
    this.selectedOrder = order;
    this.modalService.open(this.payConfirmModal, { ariaLabelledBy: 'modal-basic-title' });
  }
  confirmPay(modal: any, callback: (status: number, id?: string) => void): void {
    console.log(this.selectedOrder);
    callback(1, this.selectedOrder?.orderId);
    modal.close();
  }

  openDeleteModal(event: Event, order: Order): void {
    event?.stopPropagation();
    this.selectedOrder = order;
    this.modalService.open(this.deleteConfirmModal, { ariaLabelledBy: 'modal-basic-title' });
  }
  confirmDelete(modal: any, callback: (status: number, id?: string) => void): void {
    console.log(this.selectedOrder);
    callback(2, this.selectedOrder?.orderId);
    modal.close();
  }

  loadOrders(searchTerm?: string): void{
    this.orderService.getUserProcessing().subscribe(
      {
        next: (response) => {
          this.orders = response.data || [];
          if (!searchTerm){
          } 
          else{
            this.orders = this.orders.filter(order =>
              order.phone.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
          if (this.statusFiltOption != 'all')
            this.orders = this.orders.filter(order => order.deliveryStatus.toString() == this.statusFiltOption);
          this.sortProducts();
          this.maxPageNumber = Math.ceil(this.orders.length / this.itemsPerPage);
          this.changePage(1);
        },
        error: (error) => {
        },
        complete: () => {
        }
      }
    );
  }

  updatePaymentOrderStatus = (status: number, id?: string): void => {
    console.log('run here');
    if (id != undefined){
      console.log('huh');
      this.orderService.updatePaymentStatus(id, status).subscribe(
        {
          next: (response) => {
            console.log('updating');
            if (response.isSuccess == true){
              console.log('order is seccessfully changed');
              this.loadOrders();
            }
            console.log('response is ');
          },
          error: (error) => {
            console.error('Status:', error.status);
            console.error('Message:', error.message);
            console.error('Error Details:', JSON.stringify(error.error));
          },
          complete: () => {
            console.log('wtf here');
          }
        }
      );
    }
    console.log('whats happening');
  }

  onSortOptionChange(event: Event): void {
    this.sortOption = (event.target as HTMLSelectElement).value;
    this.loadOrders(this.keyName);
  }

  onStatusFiltChange(event: Event): void{
    this.statusFiltOption = (event.target as HTMLSelectElement).value;
    this.loadOrders(this.keyName);
  }

  sortProducts(): void{
    switch (this.sortOption) {
      case 'timeAsc':
        this.orders = this.orders.sort((a, b) => {
          const dateA = new Date(a.orderTime?? 0);
          const dateB = new Date(b.orderTime?? 0);
          return dateA.getTime() - dateB.getTime();
      });
        break;
      case 'timeDesc':
        this.orders = this.orders.sort((a, b) =>{
          const dateA = new Date(a.orderTime?? 0);
          const dateB = new Date(b.orderTime?? 0);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case 'totalAsc':
        this.orders = this.orders.sort((a, b) => a.total - b.total);
        break;
      default:
        this.orders = this.orders.sort((a, b) => b.total - a.total);
    }
  }

  onSearchInput(event: Event): void {
    this.keyName = (event.target as HTMLInputElement).value;
    this.searchTerms.next(this.keyName);
  }

  filterOrders(searchTerm: string): void {
    this.loadOrders(searchTerm);
  }

  changePage(page: number){
    this.page = page;
  }
}
