import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Card1Component } from '../../../../../shares/card-1/card-1.component';
import { Card2Component } from '../../../../../shares/card-2/card-2.component';
import { Product } from '../../../../../../models/product';
import { Category } from '../../../../../../models/category';
import { CategoryService } from '../../../../../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'product-add',
  standalone: true,
  imports: [CommonModule, FormsModule, Card1Component, Card2Component],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {
  @ViewChild('createConfirmModal') createConfirmModal!: TemplateRef<any>;
  @ViewChild('submitBtn') submitBtn: any;
  @Output() switchToListViewFunc: EventEmitter<any> = new EventEmitter();
  product: Product = {
    name: '',
    price: 0,
    imgUrl: '',
    status: 0,
    description: '',
  }
  productImgFile?: File;
  categories: Category[] = [];
  productImgUrl?: string | ArrayBuffer | null = null;

  constructor(private categoryService: CategoryService, private productService: ProductService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  switchToListView(): void {
    this.switchToListViewFunc.emit();
  }

  openCreateModal(): void {
    this.modalService.open(this.createConfirmModal, { ariaLabelledBy: 'modal-basic-title' });
  }
  confirmCreate(modal: any): void {
    this.submitBtn.nativeElement.click();
    modal.close();
  }

  setProductImgUrl(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.productImgUrl = e.target?.result;
    };
    reader.readAsDataURL(file);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.productImgFile = file;
      this.setProductImgUrl(file);
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      {
        next: (response) => {
          this.categories = response.data || [];
          this.product.categoryId = this.categories[0].categoryId;
        },
        error: (error) => {
        },
        complete: () => {
        }
      }
    );
  }


  onSubmit(event: Event) {
    console.log('submiting');
    event.preventDefault();
    this.productService.addProduct(this.product, this.productImgFile).subscribe(
      {
        next: (response) => {
          
        },
        error: (error) => {
        },
        complete: () => {
        }
      }
    );
  }
}
