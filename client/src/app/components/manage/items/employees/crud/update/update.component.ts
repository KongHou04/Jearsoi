import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'employee-update',
  standalone: true,
  imports: [],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  @Output() switchToListViewFunc: EventEmitter<any> = new EventEmitter();


  switchToListView(): void {
    this.switchToListViewFunc.emit();
  }
}
