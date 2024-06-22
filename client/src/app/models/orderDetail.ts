import { Product } from "./product";

export interface OrderDetail{
    productName: string;
    unitPrice: number;
    quantity: number;
    note?: string;
    productId: string;
    product?: Product;
}