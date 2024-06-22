import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { Category } from '../../../../../../models/category';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../../../services/category.service';
import { NotificationComponent } from '../../../../../shares/notification/notification.component';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'category-add',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  @ViewChild('createConfirmModal') createConfirmModal!: TemplateRef<any>;
  @ViewChild('submitBtn') submitBtn: any;
  @Output() switchToListViewFunc: EventEmitter<any> = new EventEmitter();
  notificationVisible: boolean = false;
  notification: any ={
    title: 'Notification',
    message: ''
  }
  category: Category = {
    name: '',
    description: '',
    status: 0,
    products: []
  };

  constructor(private categoryService: CategoryService, private modalService: NgbModal) { }


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

  onSubmit(event: Event) {
    event.preventDefault();
    this.categoryService.addCategory(this.category).subscribe(
      {
        next: (response) => {
          console.log('result form add is ' + response.msg);
          this.category = {
            name: '',
            description: '',
            status: 0,
            products: []
          };
          this.showNotification(response.msg);
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