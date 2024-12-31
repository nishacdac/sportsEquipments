import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AdminSeller, Category } from '../../models/user';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css'],
})
export class AdminCategoriesComponent implements OnInit {
 
  categories: Category[] = [];
  isEditModalOpen = false;
  isAddModalOpen = false;
  selectedCategory: Category = {
    categoryId: 0,
    name: '',
    description: '',
    createdAt: new Date(),
    categoryStatus: '',
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.dataService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  openEditModal(category: Category): void {
    this.selectedCategory = { ...category }; // Clone the category object
    this.isEditModalOpen = true;
  }

  openAddModal(): void {
    this.selectedCategory = {
      categoryId: 0,
      name: '',
      description: '',
      createdAt: new Date(),
      categoryStatus: '',
    };
    this.isAddModalOpen = true;
  }

  closeModals(): void {
    this.isEditModalOpen = false;
    this.isAddModalOpen = false;
    this.resetSelectedCategory();
  }

  resetSelectedCategory(): void {
    this.selectedCategory = {
      categoryId: 0,
      name: '',
      description: '',
      createdAt: new Date(),
      categoryStatus: '',
    };
  }

  saveCategory(): void {
    if (this.isEditModalOpen) {
      this.dataService.updateCategory(this.selectedCategory).subscribe(
        () => {
          this.closeModals();
          this.getCategories();
        },
        (error) => {
          console.error('Error updating category:', error);
        }
      );
    } else if (this.isAddModalOpen) {
      this.dataService.addCategory(this.selectedCategory).subscribe(
        () => {
          this.closeModals();
          this.getCategories();
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }

  deleteCategory(id: number): void {
    this.dataService.deleteCategory(id).subscribe(
      () => {
        this.getCategories();
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }
}


  