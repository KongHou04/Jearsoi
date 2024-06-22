import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { StatusUpdateModel } from '../models/statusUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'https://localhost:7217/Order';

  constructor(private http: HttpClient) { }

  getOrderById(id: string): Observable<ApiResponse<Order>>{
    return this.http.get<ApiResponse<Order>>(this.url+'/'+id);
  }

  getHistoryOrders(): Observable<ApiResponse<Order[]>>{
    return this.http.get<ApiResponse<Order[]>>(this.url+'/history');
  }

  getUserHistory(): Observable<ApiResponse<Order[]>>{
    return this.http.get<ApiResponse<Order[]>>(this.url+'/userhistory');
  }

  getProcessingOrders(): Observable<ApiResponse<Order[]>>{
    return this.http.get<ApiResponse<Order[]>>(this.url+'/processing');
  }

  getUserProcessing(): Observable<ApiResponse<Order[]>>{
    return this.http.get<ApiResponse<Order[]>>(this.url+'/userprocessing');
  }

  addOrder(order: Order): Observable<ApiResponse<Order>>{
    return this.http.post<ApiResponse<Order>>(this.url, order);
  }

  updateOrderStatus(orderId: string, status: number): Observable<ApiResponse<Order>>{
    let statusUpdateModel: StatusUpdateModel = {
      id: orderId,
      status: status
    }
    return this.http.put<ApiResponse<Order>>(this.url+'/updatedeliverystatus', statusUpdateModel);
  }

  updatePaymentStatus(orderId: string, status: number): Observable<ApiResponse<Order>>{
    let statusUpdateModel: StatusUpdateModel = {
      id: orderId,
      status: status
    }
    return this.http.put<ApiResponse<Order>>(this.url+'/updatepaymentstatus', statusUpdateModel);
  }

}
