import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/apiResponse';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private url = 'https://localhost:7217/Product';
  private imgDirectory = 'https://localhost:7217';

  constructor(private http: HttpClient) { }

  getImgUrl(imgUrl: string): string{
    // let newImgUrl = this.imgDirectory + '/' + imgUrl.replace(/\\/g, '/');
    let newImgUrl = this.imgDirectory+'/menus/'+imgUrl;
    return newImgUrl;
  }

  getOperatingProducts(): Observable<ApiResponse<Product[]>>{
    return this.http.get<ApiResponse<Product[]>>(this.url+'/getoperating');
  }

  getProducts(): Observable<ApiResponse<Product[]>>{
    return this.http.get<ApiResponse<Product[]>>(this.url);
  }

  addProduct(product: Product, imgFile?: File): Observable<ApiResponse<Product>>{
    const formData = new FormData();

    // Thêm thông tin của product vào FormData
    formData.append('Name', product.name);
    formData.append('Price', product.price.toString());
    formData.append('Status', product.status.toString());
    formData.append('CategoryId', product.categoryId || '');

    if (product.description)
      formData.append('Description', product.description);

    if (imgFile) {
      console.log(imgFile);
      formData.append('imgFile', imgFile);
    }

    return this.http.post<ApiResponse<Product>>(this.url, formData);
  }

  updateProduct(product: Product, imgFile?: File): Observable<ApiResponse<Product>>{
    const formData = new FormData();

    // Thêm thông tin của product vào FormData
    if (product.productId)
      formData.append('ProductId', product.productId);
    formData.append('Name', product.name);
    formData.append('Price', product.price.toString());
    formData.append('Status', product.status.toString());
    formData.append('CategoryId', product.categoryId || '');
    formData.append('ImgUrl', product.imgUrl);

    if (product.description)
      formData.append('Description', product.description);

    if (imgFile) {
      console.log(imgFile);
      formData.append('imgFile', imgFile);
    }

    return this.http.put<ApiResponse<Product>>(this.url, formData);
  }

  deleteProduct(id: string): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.url}/${id}`);
  }
}
