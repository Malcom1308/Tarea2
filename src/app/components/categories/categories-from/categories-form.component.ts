import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ICategory } from "../../../interfaces";

@Component({
    selector: 'app-categories-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './categories-form.component.html',
    styleUrl: './categories-form.component.scss'
})

export class CategoryFormComponent {
    public fb: FormBuilder = inject(FormBuilder);
    @Input() form!: FormGroup;
    @Output() callSaveMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();
    @Output() callUpdateMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();

    callSave(){
        let order: ICategory ={
            name: this.form.controls['name'].value,
            description: this.form.controls['description'].value,
        }
        if(this.form.controls['id'].value){
            order.id = this.form.controls['id'].value;
        }
        if(order.id){
            this.callUpdateMethod.emit(order);
        } else {
            this.callSaveMethod.emit(order);
        }
    }
}