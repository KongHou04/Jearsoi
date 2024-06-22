import { Component } from '@angular/core';
import { CategoryManageComponent } from './items/categories/index.component';
import { ProductManageComponent } from './items/products/index.component';
import { HistoryManageComponent } from './items/history/index.component';
import { EmployeeManageComponent } from './items/employees/index.component';
import { StatisticComponent } from './items/statistics/index.component';
import { SettingManageComponent } from './items/settings/index.component';
import { OrderManageComponent } from './items/orders/index.component';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CategoryManageComponent, ProductManageComponent, HistoryManageComponent, EmployeeManageComponent, StatisticComponent, SettingManageComponent, OrderManageComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent {
  title: string = 'Categories'

  setTitle(name: string) : void{
    this.title = name;
  }
}
