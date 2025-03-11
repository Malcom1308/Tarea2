import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../../interfaces';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss'
})
export class PreferenceListFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input() form!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callUpdateMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  callSave() {
    let item: IProduct = {
      name: this.form.controls['name'].value,
    }
    if(this.form.controls['id'].value) {
      item.id = this.form.controls['id'].value;
    } 
    if(item.id) {
      this.callUpdateMethod.emit(item);
    } else {
      this.callSaveMethod.emit(item);
    }
  }
}