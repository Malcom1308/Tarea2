import { inject, Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { ICategory, IResponse, ISearch } from "../interfaces";
import { AlertService } from "./alert.service";
import { categories } from "@ctrl/ngx-emoji-mart/ngx-emoji";

@Injectable({
    providedIn: 'root'
})
export class CategoryService extends BaseService<ICategory> {
    protected override source: string = 'categories';
    private categoryListSignal = signal<ICategory[]>([]);
    get categories$() {
        return this.categoryListSignal;
    }
    public search: ISearch = {
        page: 1,
        size: 5
    };
    public totalItems: any = [];
    private alertService: AlertService = inject(AlertService);

    getAll() {
        this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
            next: (response: any) => {
                console.log('Response:', response);
                if (Array.isArray(response)) {                                
                    this.categoryListSignal.set(response); 
                    this.search = { ...this.search, totalPages: 1 }; 
                    const totalPages = this.search.totalPages ?? 0;
                    this.totalItems = Array.from({ length: totalPages }, (_, i) => i + 1);
                } else {
                    console.error('Invalid response format:', response);
                }
            },
            error: (err: any) => {
                console.error('Error:', err);
            }
        });
    }

    save(item: ICategory) {
        this.add(item).subscribe({
            next: (response: IResponse<ICategory>) => {
                this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
                this.getAll();
            },
            error: (err: any) => {
                this.alertService.displayAlert('error', 'An error occurred adding the category', 'center', 'top', ['error-snackbar']);
                console.error('Error:', err);
            }
        });
    }

    update(categoria: ICategory) {
        this.editCustomSource(`${categoria.id}`, categoria).subscribe({
          next: (response: any) => {
            this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
            this.getAll();
          },
          error: (err: any) => {
            this.alertService.displayAlert('error', 'An error occurred updating the category','center', 'top', ['error-snackbar']);
            console.error('error', err);
          }
        });
      }

    delete(item: ICategory) {
        this.del(item.id).subscribe({
            next: (response: IResponse<ICategory>) => {
                this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
                this.getAll();
            },
            error: (err: any) => {
                this.alertService.displayAlert('error', 'An error occurred deleting the category', 'center', 'top', ['error-snackbar']);
                console.error('Error:', err);
            }
        });
    }
}