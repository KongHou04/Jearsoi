import { Product } from "./product";

export interface Category {
    categoryId?: string;
    name: string;
    status: number;
    description: string;
    products: Product[];
}
