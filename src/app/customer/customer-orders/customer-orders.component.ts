import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartItem, Product } from '../../models/user';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  totalPrice: number = 0;
  products: Product[] = [];
  cartData: CartItem[] = [];

  constructor(
    private dataService: DataService,
    private cdRef: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCartItems();
    this.getOrderPrice();
  }

  getCartItems(): void {
    this.dataService.getCartItems().subscribe({
      next: (response) => {
        this.cartData = response;
      },
      error: (err) => {
        console.error('Error fetching cart data:', err);
      },
    });
  }

  getOrderPrice(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const userIdNumber = Number(userId);
      this.dataService.getCartSummary(userIdNumber).subscribe(response => {
        if (response && response[0]?.totalPrice !== undefined) {
          this.totalPrice = response[0].totalPrice;
          this.cdRef.detectChanges();
        }
      });
    }
  }

  deleteCartItem(product_id: number): void {
    this.dataService.deleteCartItems(product_id).subscribe({
      next: () => {
        this.cartData = this.cartData.filter(item => item.product_id !== product_id);
        this.toastr.success(`Product with ID ${product_id} deleted successfully.`);
      },
      error: (error) => {
        console.error('Error deleting item', error);
        this.toastr.error('Failed to delete the product. Please try again.');
      }
    });
  }

  addToCart(productName: string): void {
    const customerId = localStorage.getItem('userId');
    if (!customerId) {
      console.error('Customer ID not found. Please log in.');
      return;
    }

    this.dataService.addToCart(customerId, productName).subscribe({
      next: () => {
        this.toastr.success('Product added to cart successfully!');
        this.getCartItems();
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this.toastr.error('Unable to add product to cart. Please try again.');
      },
    });
  }

  decrementQuantity(productId: number, quantity: number): void {
    if (quantity > 1) {
      this.dataService.updateCartItemQuantity(productId, quantity - 1).subscribe({
        next: () => {
          const item = this.cartData.find(item => item.product_id === productId);
          if (item) {
            item.quantity -= 1;
            this.toastr.success(`Decremented quantity for product ID ${productId}.`);
          }
        },
        error: (err) => {
          console.error('Error decrementing item quantity:', err);
          this.toastr.error('Failed to update the quantity. Please try again.');
        },
      });
    } else {
      this.toastr.info('Deleting item as quantity is 1.');
      this.deleteCartItem(productId);
    }
  }
}
