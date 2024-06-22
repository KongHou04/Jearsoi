import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = 'https://localhost:7217/Category';

  constructor(private http: HttpClient ) { }

  getCategories(): Observable<ApiResponse<Category[]>>{
    return this.http.get<ApiResponse<Category[]>>(this.url);
  }

  addCategory(category: Category): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(this.url, category);
  }

  updateCategory(category: Category): Observable<ApiResponse<Category>>{
    return this.http.put<ApiResponse<Category>>(this.url, category)
  }

  deleteCategory(id: string): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.url}/${id}`);
  }
}
