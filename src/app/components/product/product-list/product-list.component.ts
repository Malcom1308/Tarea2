import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class PreferenceListComponent {
  @Input() title: string  = '';
  @Input() preferenceList: IProduct[] = [];
  @Output() callModalAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callDeleteAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
}
