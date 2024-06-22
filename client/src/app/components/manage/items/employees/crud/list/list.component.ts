import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'employee-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
    
  @Output() switchToAddViewFunc: EventEmitter<any> = new EventEmitter();
  @Output() switchToUpdateViewFunc: EventEmitter<any> = new EventEmitter();
  @Output() switchToDetailsViewFunc: EventEmitter<any> = new EventEmitter();

  switchToAddView(): void {
    this.switchToAddViewFunc.emit();
  }
  switchToUpdateView(): void {
    this.switchToUpdateViewFunc.emit();
  }
  switchToDetailsView() {
    this.switchToDetailsViewFunc.emit();
  }
  // switchToDetailsView(category: any) {
  //   this.switchToDetailsViewFunc.emit(category);
  // }
}
