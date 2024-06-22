import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Product } from '../../../../../../models/product';
import { ProductService } from '../../../../../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryService } from '../../../../../../services/category.service';
import { Category } from '../../../../../../models/category';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  @ViewChild('deleteConfirmModal') deleteConfirmModal!: TemplateRef<any>;
  @Output() switchToAddViewFunc: EventEmitter<any> = new EventEmitter();
  @Output() switchToUpdateViewFunc: EventEmitter<any> = new EventEmitter();
  @Output() switchToDetailsViewFunc: EventEmitter<any> = new EventEmitter();
  selectedProduct: Product = {
    name: '',
    price: 0,
    imgUrl: '',
    status: 0
  }
  products: Product[] = [];
  categories: Category[] = [];
  allCategoryOption: Category = {
    categoryId: 'all',
    name: 'All categories',
    status: 0,
    description: '',
    products: []
  }
  sortOption: string = 'nameAsc';
  categoryFiltOption: string = 'all';
  keyName: string = '';
  page: number = 1;
  itemsPerPage: number = 10;
  maxPageNumber: number = 1;
  private searchTerms = new Subject<string>();

  constructor(private productService: ProductService, private categoryService: CategoryService, private modalService: NgbModal) {
  }

  ngOnInit() : void{
    this.loadCategories()
    this.loadProducts();
    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(term => term.trim())
    ).subscribe(term => this.filterProducts(term));
  }

  switchToAddView(): void {
    this.switchToAddViewFunc.emit();
  }
  switchToUpdateView(product: Product): void {
    this.switchToUpdateViewFunc.emit(product);
  }
  switchToDetailsView(product: Product): void {
    this.switchToDetailsViewFunc.emit(product);
  }

  openDeleteModal(event: Event, product: Product): void {
    event?.stopPropagation();
    this.selectedProduct = product;
    this.modalService.open(this.deleteConfirmModal, { ariaLabelledBy: 'modal-basic-title' });
  }
  confirmDelete(modal: any): void {
    this.deleteProduct(this.selectedProduct.productId);
    modal.close();
  }

  loadProducts(searchTerm?: string): void{
    this.productService.getProducts().subscribe(
      {
        next: (response) => {
          this.products = response.data || [];
          if (!searchTerm){
          } 
          else{
            this.products = this.products.filter(product =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
          if (this.categoryFiltOption != 'all')
            this.products = this.products.filter(product => product.categoryId == this.categoryFiltOption);
          this.sortProducts();
          this.maxPageNumber = Math.ceil(this.products.length / this.itemsPerPage);
          this.changePage(1);
        },
        error: (error) => {
        },
        complete: () => {
        }
      }
    );
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      {
        next: (response) => {
          this.categories = response.data || [];
          this.categories.unshift(this.allCategoryOption);
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
          },
          error: (error) => {
          },
          complete: () => {
          }
        }
      );
  }

  onSortOptionChange(event: Event): void {
    this.sortOption = (event.target as HTMLSelectElement).value;
    this.loadProducts(this.keyName);
  }

  onCategoryFiltChange(event: Event): void{
    this.categoryFiltOption = (event.target as HTMLSelectElement).value;
    console.log(this.categoryFiltOption);
    this.loadProducts(this.keyName);
  }

  sortProducts(): void{
    switch (this.sortOption) {
      case 'nameAsc':
        this.products = this.products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        this.products = this.products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceAsc':
        this.products = this.products.sort((a, b) => a.price - b.price);
        break;
      default:
        this.products = this.products.sort((a, b) => b.price - a.price);
    }
  }

  onSearchInput(event: Event): void {
    this.keyName = (event.target as HTMLInputElement).value;
    this.searchTerms.next(this.keyName);
  }

  filterProducts(searchTerm: string): void {
    this.loadProducts(searchTerm);
  }

  changePage(page: number){
    this.page = page;
  }

  getImgUrl(imgUrl: string): string{
    return this.productService.getImgUrl(imgUrl);
  }
}