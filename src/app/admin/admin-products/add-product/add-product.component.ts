import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Product } from '../../../models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  categories: any[] = []; // Array to hold category data from the API
  imageBase64: string = ''; // To hold the Base64 encoded string of the image

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      product_name: ['', [Validators.required, Validators.minLength(3)]],
      categoryName: ['', Validators.required],
      material_type: ['', Validators.required],
      image_url: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]], // Ensuring price is a positive number
      createdDate: [new Date(), Validators.required],
      updatedAt: [''],
    });

    // Fetch categories for the dropdown
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.dataService.getCategories().subscribe(
      (response: any) => {
        this.categories = response; // Assuming API returns an array of categories
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Method to handle file input change and convert to Base64
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imageBase64 = reader.result as string;
      this.addProductForm.patchValue({ image_url: this.imageBase64 });
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      const productData: Product = this.addProductForm.value;
      const categoryName = productData.categoryName || 'DefaultCategory';

      this.dataService.addProduct(productData, categoryName).subscribe(
        (response: Product) => {
          this.toastr.success('Product added successfully');
          this.addProductForm.reset();
          this.router.navigate(['admin/list-product']);
        },
        (error: any) => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
