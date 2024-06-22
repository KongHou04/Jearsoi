import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'employee-add',
  standalone: true,
  imports: [],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  @Output() switchToListViewFunc: EventEmitter<any> = new EventEmitter();


  switchToListView(): void {
    this.switchToListViewFunc.emit();
  }
}
