import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderDetail } from '../../models/orderDetail';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  @ViewChild('logoutConfirmModal') logoutConfirmModal!: TemplateRef<any>;
  cartItemLength: number = 0;
  user?: User;
  searchQuery: string = '';
  constructor(private cartService: CartService, private userService: UserService, private modalService: NgbModal, private router: Router) {}
  
  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart: OrderDetail[]) => {
      this.cartItemLength = cart.reduce((total, item) => total + item.quantity, 0);
    });
    this.userService.user$.subscribe(user => this.user = user);
  }

  openLogoutModal(): void {
    this.modalService.open(this.logoutConfirmModal, { ariaLabelledBy: 'modal-basic-title' });
  }
  confirmLogout(modal: any): void {
    this.userService.logout();
    modal.close();
    this.router.navigate(['/login']);
  }

  searchProduct(): void {
    if (this.searchQuery) {
      this.router.navigate(['/menus'], { queryParams: { search: this.searchQuery } });
    }
  }
}
