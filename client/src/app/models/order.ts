import { Time } from "@angular/common";
import { OrderDetail } from "./orderDetail";

export class Order{
    orderId?: string;
    orderTime?: Date;
    email?: string;
    phone: string = '';
    address: string = '';
    subTotal: number = 0;
    discount: number = 1;
    total: number = 0;
    note?: string;
    deliveryStatus: number = 0;
    paymentStatus: number = 0;
    userId?: string;
    orderDetails: OrderDetail[] = [];
}