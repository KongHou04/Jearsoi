import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-2.component.html',
  styleUrl: './card-2.component.scss'
})
export class Card2Component {
  @Input() product: Product = {
    name: '',
    price: 0,
    status: 0,
    description: '',
    imgUrl: ''
  }
  @Input() productImgUrl?: string | ArrayBuffer | null;
  defaultImgUrl: string = 'assets/images/menus/2.jpg';

}
