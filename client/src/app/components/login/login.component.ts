import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: ''
  }

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }
  ngOnInit(): void {
    console.log('init now');
    if (this.userService.isLogged())
      this.router.navigate(['/']);
  }

  logUser(): void{
    console.log(this.user);
  }

  login(): void {
    console.log('logining');
    this.authService.login(this.user.username, this.user.password).subscribe({
      next:(response) => {
        console.log(response);
        // Xử lý kết quả đăng nhập ở đây
        if (response.isSuccess) {
          // Đăng nhập thành công, điều hướng đến trang khác
          console.log('waiting for User info');
          this.userService.getUserInfo();
          this.router.navigate(['/']);
        } else {
          // Đăng nhập không thành công, xử lý thông báo lỗi hoặc hiển thị lỗi cho người dùng
          console.error(response.msg);
        }
      },
      error: (error) => {
        // Xử lý lỗi khi gọi API đăng nhập
        console.error('Error logging in:', error);
      },
      complete: () => {
      }
    });
  }
}
