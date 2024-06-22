import { Component } from '@angular/core';
import { AddComponent } from './crud/add/add.component';
import { UpdateComponent } from './crud/update/update.component';
import { DetailsComponent } from './crud/details/details.component';
import { ListComponent } from './crud/list/list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'employee-manage-board',
  standalone: true,
  imports: [CommonModule, AddComponent, UpdateComponent, DetailsComponent, ListComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class EmployeeManageComponent {
  view: string = 'list';

  setView(view: string){
    this.view = view;
  }
}
