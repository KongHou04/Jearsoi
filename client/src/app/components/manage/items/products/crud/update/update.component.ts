import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Card1Component } from '../../../../../shares/card-1/card-1.component';
import { Card2Component } from '../../../../../shares/card-2/card-2.component';
import { Product } from '../../../../../../models/product';
import { Category } from '../../../../../../models/category';
import { CategoryService } from '../../../../../../services/category.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'category-update',
  standalone: true,
  imports: [CommonModule, FormsModule, Card1Component, Card2Component],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  @ViewChild('updateConfirmModal') updateConfirmModal!: TemplateRef<any>;
  @ViewChild('submitBtn') submitBtn: any;
  @Output() switchToListViewFunc: EventEmitter<any> = new EventEmitter();
  @Input() defaultProduct: Product = {
    name: '',
    price: 0,
    imgUrl: '',
    status: 0,
    description: '',
  }
  product: Product = {
    name: '',
    price: 0,
    imgUrl: '',
    status: 0,
    description: '',
  }
  productImgFile?: File;
  productImgUrl?: string | ArrayBuffer | null = null;
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private productService: ProductService, private modalService: NgbModal) {}
  
  ngOnInit(): void {

    this.loadCategories();

    this.product.productId = this.defaultProduct.productId;
    this.product.name = this.defaultProduct.name;
    this.product.price = this.defaultProduct.price;
    this.product.imgUrl = this.defaultProduct.imgUrl;
    this.product.status = this.defaultProduct.status;
    this.product.description = this.defaultProduct.description;
    this.product.categoryId = this.defaultProduct.categoryId;
    this.productImgUrl = this.productService.getImgUrl(this.defaultProduct.imgUrl);
  }
  
  switchToListView(): void {
    this.switchToListViewFunc.emit();
  }

  openUpdateModal(): void {
    this.modalService.open(this.updateConfirmModal, { ariaLabelledBy: 'modal-basic-title' });
  }
  confirmUpdate(modal: any): void {
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
        },
        error: (error) => {
        },
        complete: () => {
        }
      }
    );
  }

  resetToDefault(){
    this.product.name = this.defaultProduct.name;
    this.product.price = this.defaultProduct.price;
    this.product.imgUrl = this.defaultProduct.imgUrl;
    this.product.status = this.defaultProduct.status;
    this.product.description = this.defaultProduct.description;
    this.product.categoryId = this.defaultProduct.categoryId;
    this.productImgUrl = this.productService.getImgUrl(this.defaultProduct.imgUrl);
  }

  onSubmit(event: Event){
    event.stopPropagation();
    this.productService.updateProduct(this.product, this.productImgFile).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
        },
        complete: () => {
        }
      }
    );
  }
  
}
