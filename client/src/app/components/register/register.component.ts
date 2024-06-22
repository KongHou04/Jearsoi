import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerModel = {
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }
  ngOnInit(): void {
    console.log('init now');
    if (this.userService.isLogged())
      this.router.navigate(['/']);
  }

  logUser(): void{
    console.log(this.registerModel);
  }

  register(): void {
    console.log('creating new acc');
    if (!this.registerModel.email || !this.registerModel.fullName || !this.registerModel.phoneNumber || (this.registerModel.password != this.registerModel.confirmPassword) )
      alert('invalid data to create new accounr');
    this.authService.register(this.registerModel).subscribe({
      next:(response) => {
        console.log(response);
        if (response.isSuccess) {
          alert('success');
          this.router.navigate(['/login']);
        } else {
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
