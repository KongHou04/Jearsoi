import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { routes } from '../app.routes';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          return this.handle401Error(request, next);
        }
        return empty();
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = this.authService.getRefreshToken();
    if (!refreshToken) {
      this.router.navigate(['/login']);
      return empty();
    }

    // Gửi yêu cầu refresh token
    return this.authService.refreshToken().pipe(
      switchMap((response: any) => {
        if (response && response.accessToken) {
          // Thử lại request gốc với token mới
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`
            }
          });
          return next.handle(request);
        } else {
          // Nếu không có accessToken mới, đăng xuất
          this.authService.clearTokens();
          return throwError('Failed to refresh token');
        }
      })
    );
  }
}
