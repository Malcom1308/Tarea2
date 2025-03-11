import { CommonModule } from "@angular/common";
import { Component, inject, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoaderComponent } from "../../components/loader/loader.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ProductService } from "../../services/product.service";
import { ModalService } from "../../services/modal.service";
import { IProduct } from "../../interfaces";
import { PreferenceListComponent } from "../../components/product/product-list/product-list.component";
import { PreferenceListFormComponent } from "../../components/product/product-form/product-form.component";


@Component({
  standalone: true,
  selector: 'app-product-page',
  imports: [
    CommonModule,
    LoaderComponent,
    PaginationComponent,
    ModalComponent,
    PreferenceListComponent,
    PreferenceListFormComponent
],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductPageComponent {
  public productService: ProductService = inject(ProductService);
  public modalService: ModalService = inject(ModalService);
  public fb: FormBuilder = inject(FormBuilder);
  @ViewChild('addProductModal') public addProductModal: any;
  public title: string = 'Products';
  public productForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    stock: ['', Validators.required]
  })

  constructor() {
    this.productService.getAll();
  }

  saveProduct(item: IProduct) {
    this.productService.save(item);
    this.modalService.closeAll();
  }

  updateProduct(item: IProduct) {
    this.productService.update(item);
    this.modalService.closeAll();
  }

  callEdition(item: IProduct) {
    this.productForm.controls['id'].setValue(item.id ? JSON.stringify(item.id) : '');
    this.productForm.controls['name'].setValue(item.name ? item.name : '');
    this.productForm.controls['description'].setValue(item.description ? item.description : '');
    this.productForm.controls['price'].setValue(item.price ? JSON.stringify(item.price) : '');
    this.productForm.controls['stock'].setValue(item.stock ? JSON.stringify(item.stock) : '');
    this.modalService.displayModal('md', this.addProductModal);
  }

  deleteProduct(item: IProduct) {
    this.productService.delete(item);
  }
}