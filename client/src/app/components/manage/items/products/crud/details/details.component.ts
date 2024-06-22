import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Card1Component } from '../../../../../shares/card-1/card-1.component';
import { Card2Component } from '../../../../../shares/card-2/card-2.component';
import { Product } from '../../../../../../models/product';
import { Category } from '../../../../../../models/category';
import { CategoryService } from '../../../../../../services/category.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [CommonModule, Card1Component, Card2Component],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  @ViewChild('deleteConfirmModal') deleteConfirmModal!: TemplateRef<any>;
  @Output() switchToListViewFunc: EventEmitter<any> = new EventEmitter();
  @Output() switchToUpdateViewFunc: EventEmitter<any> = new EventEmitter();
  @Input() product: Product = {
    name: '',
    price: 0,
    imgUrl: '',
    status: 0,
    description: '',
  }
  categories: Category[] = [];
  isProductDeleted: boolean = false;

  constructor(private categoryService: CategoryService, private productService: ProductService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadCategories();
    console.log(this.product.price);
    console.log(this.product.categoryId);
  }

  switchToListView(): void {
    this.switchToListViewFunc.emit();
  }
  
  switchToUpdateView(): void {
    this.switchToUpdateViewFunc.emit(this.product);
  }

  openDeleteModal(): void {
    this.modalService.open(this.deleteConfirmModal, { ariaLabelledBy: 'modal-basic-title' });
  }
  confirmDelete(modal: any): void {
    this.deleteProduct(this.product.productId);
    modal.close();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      {
        next: (response) => {
          this.categories = response.data || [];
        },
        error: (error) => {
        },
        complete: () => {
        }
      }
    );
  }
  
  deleteProduct(id?: string): void{
    if (id)
      this.productService.deleteProduct(id).subscribe(
        {
          next: (response) => {
            if (response.isSuccess == true)
              this.isProductDeleted = true;
          },
          error: (error) => {
          },
          complete: () => {
          }
        }
      );
  }
}
