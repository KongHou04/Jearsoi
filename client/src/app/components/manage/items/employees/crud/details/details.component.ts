import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'employee-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  @Output() switchToListViewFunc: EventEmitter<any> = new EventEmitter();


  switchToListView(): void {
    this.switchToListViewFunc.emit();
  }
}
