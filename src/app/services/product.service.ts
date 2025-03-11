import { Injectable, inject, signal } from '@angular/core';
import { BaseService } from './base-service';
import {  IProduct, IResponse, ISearch } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProduct> {
  private productListSignal = signal<IProduct[]>([]);
  private alertService: AlertService = inject(AlertService);
  protected override source: string = 'products';
  get products$() {
    return this.productListSignal;
  }
  public search: ISearch = {
    page: 1,
    size: 5
  }
  public totalItems: any = [];


  getAll() {
    this.findAllWithParams(this.search).subscribe({
      next: (response: IResponse<IProduct[]>) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
        this.productListSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  save(item: IProduct) {
    this.add(item).subscribe({
      next: (response: IResponse<IProduct>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding the preference list', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  update(item: IProduct) {
    this.editCustomSource('', item).subscribe({
      next: (response: IResponse<IProduct>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred updating the order', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(item: IProduct) {
    this.del(item.id).subscribe({
      next: (response: IResponse<IProduct>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the order', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

}
