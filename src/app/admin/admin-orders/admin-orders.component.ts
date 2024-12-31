import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Orders } from '../../models/user'; // Make sure this path is correct

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  orders: Orders[] = []; // Array to store the orders data

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchOrders(); // Call the method to fetch orders
  }

  fetchOrders(): void {
    this.dataService.getOrders().subscribe({
      next: (data: Orders[]) => {
        this.orders = data; // Data from API will be assigned to the orders array
      },
      error: (err) => {
        console.error('Error fetching orders:', err); // Handle errors
      },
    });
  }
}
