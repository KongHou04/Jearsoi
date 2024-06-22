import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = 'https://localhost:7217/Account/getinfo';
  private user?: User;
  private userSubject = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.userSubject.asObservable();

  constructor(private authService: AuthService, private http: HttpClient){
    this.loadUser();
  }

  public getUserInfo(): void{
    this.http.get(this.apiUrl).subscribe({
      next:(response) => {
        var rp = response as ApiResponse<User>;
        if (rp){
          this.user = rp.data!;
          this.userSubject.next(this.user);
          this.saveUser();
        }
      }
    });
  }

  public isLogged(): boolean{
    if (this.user)
      return true;
    return false;
  }

  public getRole(): string | undefined{
    return this.user?.role;
  }

  private saveUser(): void {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  private loadUser(): void {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
      this.userSubject.next(this.user);
    }
  }

  logout(): void{
    this.user = undefined;
    localStorage.removeItem('user');
    this.userSubject.next(this.user);
    this.authService.clearTokens();
  }

}
