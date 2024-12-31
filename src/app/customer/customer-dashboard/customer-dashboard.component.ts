import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/user';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  products: Product[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  selectedProduct: Product | null = null; // Store selected product for modal

  constructor(
    private dataService: DataService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.getProducts(); // Fetch products on initialization
  }

  // Fetch products
  getProducts(): void {
    this.loading = true;
    this.errorMessage = '';
    this.dataService.getProducts().subscribe({
      next: (response) => {
        this.products = response; // Assign API response to products array
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.errorMessage = 'Unable to fetch products. Please try again later.';
        this.loading = false;
      }
    });
  }

  // Search products
  searchProduct(): void {
    this.loading = true;
    this.errorMessage = '';
    this.dataService.getSearchProducts(this.searchQuery).subscribe({
      next: (response) => {
        this.products = response; // Assign filtered data
        this.loading = false;
      },
      error: (err) => {
        console.error('Error searching products:', err);
        this.errorMessage = 'Unable to search products. Please try again.';
        this.loading = false;
      }
    });
  }

  // View details in modal
  viewDetails(product: Product): void {
    this.selectedProduct = product;
  }

  // Close modal
  closeModal(): void {
    this.selectedProduct = null;
  }

  // Method to add a product to the cart
  addToCart(productName: string): void {
    const customerId = localStorage.getItem('userId'); // Retrieve customer ID from local storage
    if (!customerId) {
      this.errorMessage = 'Customer ID not found. Please log in.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.dataService.addToCart(customerId, productName).subscribe({
      next: (response) => {
        console.log('Product added to cart successfully:', response);
        this.toastr.success('Product added to cart successfully!'); // Show toastr success message
        this.loading = false;
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this.errorMessage = 'Unable to add product to cart. Please try again.';
        this.loading = false;
      },
    });
  }
}
