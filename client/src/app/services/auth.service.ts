import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'https://localhost:7217/Account';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Login`, { email, password }).pipe(
      tap(response => {
        // Lưu token vào local storage
        localStorage.setItem('accessToken', response.data.jwtToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      })
    );
  }

  register(registerModel: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Register`, registerModel);
  }

  refreshToken(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const tokenModel = {
        jwtToken: accessToken,
        refreshToken: refreshToken
    }
    console.log(tokenModel);
    return this.http.post<any>(`${this.apiUrl}/Refresh`, { tokenModel }).pipe(
      tap(response => {
        // Lưu token mới vào local storage
        localStorage.setItem('accessToken', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
      })
    );
  }

  // Xóa token khi đăng xuất
  clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  // Lấy token từ local storage
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
}
