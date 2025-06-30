import { Component, inject, ViewChild } from "@angular/core";
import { ICategory, IProduct } from "../../interfaces";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalService } from "../../services/modal.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../services/product.service";
import { ModalComponent } from "../../components/modal/modal.component";
import { ProductFormComponent } from "../../components/product/product-form/product-form.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { ProductListComponent } from "../../components/product/product-list/product-list.component";
import { CategoryService } from "../../services/category.service";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    standalone: true,
    imports: [ProductFormComponent, ProductListComponent, PaginationComponent, ModalComponent]
})
export class ProductComponent {
    public productList: IProduct[] = []
    public productService: ProductService = inject(ProductService);
    public categoryService: CategoryService = inject(CategoryService);
    public fb: FormBuilder = inject(FormBuilder);
    public productForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        quantity: ['', Validators.required],
        categoryId: ['', Validators.required]
    });

    public modalService: ModalService = inject(ModalService);
    @ViewChild('editProductModal') public editProductModal: any;

    public authService: AuthService = inject(AuthService);
    public areActionsAvailable: boolean = false;
    public route: ActivatedRoute = inject(ActivatedRoute);

    ngOnInit(): void{
        this.authService.getUserAuthorities();
        this.route.data.subscribe(data => {
            this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities']? data['authorities'] : []);
        });
    }

    constructor(){
        this.productService.getAll();
        this.categoryService.getAll();
    }

    saveProduct(item: IProduct){
        this.productService.save(item);
    }

    updateProduct(item: IProduct){
        this.productService.update(item);
        this.modalService.closeAll();
        this.productForm.reset();
    }

    deleteProduct(item: IProduct){
        this.productService.delete(item);
    }

    openEditModal(product: IProduct){
        console.log("openEditModal", product);
        this.productForm.patchValue({
            id: JSON.stringify(product.id),
            name: product.name,
            description: product.description,
            price: JSON.stringify(product.price),
            quantity: JSON.stringify(product.quantity),
            categoryId: product.categories && product.categories.length > 0 ? String(product.categories[0].id) : ''
        });
        this.modalService.displayModal('lg', this.editProductModal);
    }
}