import { Component, OnInit } from '@angular/core';
import { HistoryManageComponent } from './items/history/index.component';
import { SettingManageComponent } from './items/settings/index.component';
import { OrderManageComponent } from './items/orders/index.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [HistoryManageComponent, SettingManageComponent, OrderManageComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {
    var role = this.userService.getRole();
    console.log(role);
    if (role == 'admin')
      this.router.navigate(['/manage']);
  }
  title: string = 'Categories'

  setTitle(name: string) : void{
    this.title = name;
  }
}
