import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-1.component.html',
  styleUrl: './card-1.component.scss'
})
export class Card1Component {
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
