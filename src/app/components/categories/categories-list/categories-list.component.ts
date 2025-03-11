import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AuthService } from '../../../services/auth.service';
import { ICategory } from "../../../interfaces";

@Component({
    selector: 'app-categories-list',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './categories-list.component.html',
    styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {
    public AuthService: AuthService = new AuthService();
    @Input() title: string = '';
    @Input() categories: ICategory[] = [];
    @Output() callModalAction: EventEmitter<ICategory> = new EventEmitter<ICategory>(); 
    @Output() callDeleteAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
}