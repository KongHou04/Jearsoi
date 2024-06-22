import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './crud/list/list.component';
import { AddComponent } from './crud/add/add.component';
import { UpdateComponent } from './crud/update/update.component';
import { DetailsComponent } from './crud/details/details.component';
import { Category } from '../../../../models/category';

@Component({
  selector: 'category-manage-board',
  standalone: true,
  imports: [CommonModule, ListComponent, AddComponent, UpdateComponent, DetailsComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class CategoryManageComponent {
  view : string = 'list';
  selectedCategory: Category = {
    name: '',
    description: '',
    status: 0,
    products: []
  };

  setView(view: string): void {
    this.view = view;
  }
  switchToUpdate(category: any) {
    this.selectedCategory = category;
    this.setView('update');
  }
  switchToDetails(category: any) {
    this.selectedCategory = category;
    this.setView('details');
  }
}
