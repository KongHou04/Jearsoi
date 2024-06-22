import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './crud/list/list.component';
import { AddComponent } from './crud/add/add.component';
import { UpdateComponent } from './crud/update/update.component';
import { DetailsComponent } from './crud/details/details.component';
import { Product } from '../../../../models/product';

@Component({
  selector: 'product-manage-board',
  standalone: true,
  imports: [CommonModule, ListComponent, AddComponent, UpdateComponent, DetailsComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class ProductManageComponent {
  view : string = 'list';
  selectedProduct: Product = {
    name: '',
    price: 0,
    imgUrl: '',
    status: 0
  }

  
  setView(view: string): void {
    this.view = view;
  }

  switchToUpdate(product: Product){
    this.selectedProduct = product;
    this.setView('update');
  }

  switchToDetails(product: Product){
    this.selectedProduct = product;
    this.setView('details');
  }

}
