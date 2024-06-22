import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'setting-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class SettingManageComponent {
  view : string = 'list';
  setView(view: string): void {
    this.view = view;
  }

}
