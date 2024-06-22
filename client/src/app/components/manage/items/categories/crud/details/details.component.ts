import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { CategoryService } from '../../../../../../services/category.service';
import { Category } from '../../../../../../models/category';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from '../../../../../shares/notification/notification.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'category-details',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  @ViewChild('deleteConfirmModal') deleteConfirmModal!: TemplateRef<any>;
  @Output() switchToListViewFunc: EventEmitter<any> = new EventEmitter();
  @Output() switchToUpdateViewFunc: EventEmitter<any> = new EventEmitter();
  @Input() category: Category = {
    categoryId: '',
    name: '',
    description: '',
    status: 0,
    products: []
  };
  notificationVisible: boolean = false;
  notification: any ={
    title: 'Notification',
    message: ''
  }
  isCategoryDeleted = false;

  constructor(private categoryService: CategoryService, private modalService: NgbModal) {}

  switchToListView(): void {
    this.switchToListViewFunc.emit();
  }

  switchToUpdateView(): void{
    this.switchToUpdateViewFunc.emit(this.category);
  }

  openDeleteModal(): void {
    this.modalService.open(this.deleteConfirmModal, { ariaLabelledBy: 'modal-basic-title' });
  }
  confirmDelete(modal: any): void {
    this.deleteCategory(this.category.categoryId);
    modal.close();
  }

  deleteCategory(id?: string){
    console.log('hello')
    console.log(id);
    if (id == null){
      this.showNotification('Invalid category data. Cannot delete now. Try later');
    }
    else
      this.categoryService.deleteCategory(id).subscribe(
        {
          next: (response) => {
            console.log('go here');
            this.showNotification(response.msg);
            this.isCategoryDeleted = true;
          },
          error: (error) => {
            console.log( error);
          },
          complete: () => {
            console.log('huh? huh?');
          }
        }
      );
  }
  
  showNotification(msg: string): void{
    this.notification.message = msg;
    this.notificationVisible = true;
    setTimeout(() => {
      this.notificationVisible = false;
    }, 8000);
  }
}
