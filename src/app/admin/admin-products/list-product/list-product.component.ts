import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/user';
import { DataService } from '../../../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  modalType: 'view' | 'edit' | null = null;

  constructor(private dataService: DataService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.dataService.getProducts().subscribe((data: Product[]) => (this.products = data));
  }

  editProduct(product: Product): void {
    this.selectedProduct = { ...product };
    this.modalType = 'edit';
  }

  viewDetails(product: Product): void {
    this.selectedProduct = { ...product };
    this.modalType = 'view';
  }

  closeModal(): void {
    this.selectedProduct = null;
    this.modalType = null;
  }

  saveChanges(productForm: any): void {
    if (productForm.valid && this.selectedProduct) {
      const id = this.selectedProduct.product_ID;
      this.selectedProduct.in_Active = !!this.selectedProduct.in_Active;

      this.dataService.updateProduct(id, this.selectedProduct).subscribe(
        () => {
          this.getProducts();
          this.closeModal();
          this.toastr.success('Product updated successfully!', 'Success');
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      this.toastr.error('Please fill in all required fields.', 'Error');
    }
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedProduct!.image_url = e.target.result; // Base64 string
      };
      reader.readAsDataURL(file);
    }
  }
}
