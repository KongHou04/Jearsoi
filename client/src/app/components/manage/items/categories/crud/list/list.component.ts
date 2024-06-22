import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { CategoryService } from '../../../../../../services/category.service';
import { Category } from '../../../../../../models/category';
import { NotificationComponent } from '../../../../../shares/notification/notification.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'category-list',
  standalone: true,
  imports: [CommonModule, NotificationComponent, NgxPaginationModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  @ViewChild('deleteConfirmModal') deleteConfirmModal!: TemplateRef<any>;
  @Output() switchToAddViewFunc: EventEmitter<any> = new EventEmitter();
  @Output() switchToUpdateViewFunc: EventEmitter<any> = new EventEmitter();
  @Output() switchToDetailsViewFunc = new EventEmitter<any>();
  notificationVisible: boolean = false;
  notification: any = {
    title: 'Notification',
    message: ''
  }
  selectedCategory: Category = {
    categoryId: '',
    name: '',
    description: '',
    status: 0,
    products: []
  };
  categories: Category[] = [];
  sortOption: string = 'nameAsc';
  keyName: string = '';
  page: number = 1;
  itemsPerPage: number = 10;
  maxPageNumber: number = 1;
  private searchTerms = new Subject<string>();

  constructor(private categoryService: CategoryService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.loadCategories();
    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(term => term.trim())
    ).subscribe(term => this.filterCategories(term));
  }

  switchToAddView(): void {
    this.switchToAddViewFunc.emit();
  }

  switchToUpdateView(category: Category): void {
    this.switchToUpdateViewFunc.emit(category);
  }

  switchToDetailsView(category: Category) {
    this.switchToDetailsViewFunc.emit(category);
  }

  openDeleteModal(event: Event, category: Category): void {
    event?.stopPropagation();
    this.selectedCategory = category;
    this.modalService.open(this.deleteConfirmModal, { ariaLabelledBy: 'modal-basic-title' });
  }
  confirmDelete(modal: any): void {
    this.deleteCategory(this.selectedCategory.categoryId);
    modal.close();
  }


  loadCategories(searchTerm?: string): void {
    this.categoryService.getCategories().subscribe(
      {
        next: (response) => {
          this.categories = response.data || [];
          if (!searchTerm){
          } 
          else{
            this.categories = this.categories.filter(category =>
              category.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
          this.sortCategories();
          this.maxPageNumber = Math.ceil(this.categories.length / this.itemsPerPage);
          this.changePage(1);
        },
        error: (error) => {
        },
        complete: () => {
        }
      }
    );
  }

  deleteCategory(id?: string) {
    console.log('hello')
    console.log(id);
    if (id == null) {
      this.showNotification('Invalid category data. Cannot delete now. Try later');
    }
    else
      this.categoryService.deleteCategory(id).subscribe(
        {
          next: (response) => {
            this.loadCategories();
            this.showNotification(response.msg);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            console.log('huh? huh?');
          }
        }
      );
  }

  onSortOptionChange(event: Event): void {
    this.sortOption = (event.target as HTMLSelectElement).value;
    this.loadCategories(this.keyName);
  }

  sortCategories(): void{
    switch (this.sortOption) {
      case 'nameAsc':
        this.categories = this.categories.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        this.categories = this.categories.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'statusAsc':
        this.categories = this.categories.sort((a, b) => a.status - b.status);
        break;
      default:
        this.categories = this.categories.sort((a, b) => b.status - a.status);
    }
  }

  onSearchInput(event: Event): void {
    this.keyName = (event.target as HTMLInputElement).value;
    this.searchTerms.next(this.keyName);
  }

  filterCategories(searchTerm: string): void {
    this.loadCategories(searchTerm);
  }

  changePage(page: number){
    this.page = page;
  }
  
  showNotification(msg: string): void {
    this.notification.message = msg;
    this.notificationVisible = true;
    setTimeout(() => {
      this.notificationVisible = false;
    }, 8000);
  }
}