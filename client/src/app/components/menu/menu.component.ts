import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  allCategoryOption: Category = {
    categoryId: 'all',
    name: 'All categories',
    description: '',
    status: 1,
    products: []
  };
  sortOption: string = 'nameAsc';
  filterInfo: any = {
    keyName: '',
    categoryId: 'all',
    priceRange: '0-100',
  }


  page: number = 1;
  itemsPerPage: number = 12;
  maxPageNumber: number = 1;


  constructor(private productService: ProductService, private categoryService: CategoryService, private cartService: CartService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filterInfo.keyName = params['search'];
    });
    this.loadCategorys();
    this.loadProducts();
  }


  loadProducts(): void {
    // let tempProducts: Product[] = [];
    this.productService.getOperatingProducts().subscribe(
      {
        next: (response) => {
          this.products = response.data || [];
          this.filtProducts();
          this.maxPageNumber = Math.ceil(this.products.length / this.itemsPerPage);
          this.sortProducts();
          this.changePage(1);
        },
        error: (error) => {
        },
        complete: () => {
        }
      }
    );
  }

  loadCategorys(): void {
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

  filtProducts() {
    const priceRange = this.filterInfo.priceRange.split('-');
    const minPrice = parseFloat(priceRange[0]);
    const maxPrice = parseFloat(priceRange[1]);
    this.products = this.products.filter(product => {
      const isNameMatch = this.filterInfo.keyName === '' || product.name.toLowerCase().includes(this.filterInfo.keyName.toLowerCase());
      const isCategoryIdMatch = this.filterInfo.categoryId === 'all' || product.categoryId === this.filterInfo.categoryId;
      const isPriceInRange = product.price > minPrice && product.price <= maxPrice;
      return isNameMatch && isCategoryIdMatch && isPriceInRange;
    })
  }

  refreshFilterInfo(){
    this.filterInfo.keyName = '';
    this.filterInfo.categoryId = 'all';
    this.filterInfo.priceRange = '0-100';
    this.loadProducts();
  }

  onSortOptionChange(event: Event): void {
    this.sortOption = (event.target as HTMLSelectElement).value;
    this.sortProducts();
    this.changePage(1);
  }

  sortProducts() {
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
      case 'priceDesc':
        this.products = this.products.sort((a, b) => b.price - a.price);
        break;
      default:
        this.products = this.products;
    }
  }

  changePage(page: number) {
    this.page = page;
  }

  getImgUrl(imgUrl: string): string {
    return this.productService.getImgUrl(imgUrl);
  }

  addToCart(product: Product): void {
    this.cartService.addProductToCart(product, 1);
  }
}
