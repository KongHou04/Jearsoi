export interface Product {
    productId?: string;
    name: string;
    price: number;
    imgUrl: string;
    imgFile?: File;
    status: number;
    description?: string;
    categoryId?: string;
}
