import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Category } from '../../../../../../models/category';
import { CategoryService } from '../../../../../../services/category.service';
import { NotificationComponent } from '../../../../../shares/notification/notification.component';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'category-update',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  @ViewChild('updateConfirmModal') updateConfirmModal!: TemplateRef<any>;
  @ViewChild('submitBtn') submitBtn: any;
  @Output() switchToListViewFunc: EventEmitter<any> = new EventEmitter();
  @Input() defaultCategory: Category = {
    name: '',
    description: '',
    status: 0,
    products: []
  };
  category: Category = {
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

  constructor(private categoryService: CategoryService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.category.categoryId = this.defaultCategory.categoryId;
    this.category.name = this.defaultCategory.name;
    this.category.description = this.defaultCategory.description;
    this.category.status = this.defaultCategory.status;
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
  
  resetToDefault(): void{
    console.log('reseted');
    
    console.log(this.defaultCategory);
    console.log(this.category);
    this.category.name = this.defaultCategory.name;
    this.category.status = this.defaultCategory.status;
    this.category.description = this.defaultCategory.description;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.category != undefined)
      this.categoryService.updateCategory(this.category).subscribe(
        {
          next: (response) => {
            this.showNotification(response.msg);
          },
          error: (error) => {
          },
          complete: () => {
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
