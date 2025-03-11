import { Component, inject, ViewChild } from "@angular/core";
import { ModalService } from "../../services/modal.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ICategory } from "../../interfaces";
import { CategoryService } from "../../services/category.service";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "../../components/loader/loader.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { CategoriesListComponent } from "../../components/categories/categories-list/categories-list.component";
import { CategoryFormComponent } from "../../components/categories/categories-from/categories-form.component";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-categories', 
    standalone: true,   
    imports: [
    CommonModule,
    LoaderComponent,
    PaginationComponent,
    ModalComponent,
    CategoriesListComponent,
    CategoryFormComponent,
],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
                          
export class CategoriesComponent {
    public categoryService: CategoryService = inject(CategoryService);
    public modalService: ModalService = inject(ModalService);
    public fb: FormBuilder = inject(FormBuilder);
    public authService: AuthService = inject(AuthService);
    @ViewChild('addCategoryModal') public addCategoryModal: any;
    public title: string = 'Categories';
    categoryForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: ['', Validators.required]
    })  

    constructor() {
        this.categoryService.search.page = 1;
        this.authService.isSuperAdmin() ? 
        this.categoryService.getAll() : this.categoryService.getAll();
    }

    saveCategory(item: ICategory) {
        this.categoryService.save(item);
        this.modalService.closeAll();
    }

     callEdition(item: ICategory) {
        this.categoryForm.controls['id'].setValue(item.id ? JSON.stringify(item.id) : '');
        this.categoryForm.controls['name'].setValue(item.name ? item.name : '');
        this.categoryForm.controls['description'].setValue(item.description ? item.description : '');
        this.modalService.displayModal('md', this.addCategoryModal);
    }

    updateCategory(item: ICategory) {
        this.categoryService.update(item);
        this.modalService.closeAll();
      }
}