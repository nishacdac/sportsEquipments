import { Component, OnInit } from '@angular/core';
import { AdminSeller } from '../../../models/user';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-list-seller',
  templateUrl: './list-seller.component.html',
  styleUrls: ['./list-seller.component.css'],
})
export class ListSellerComponent implements OnInit {
  
[x: string]: any;
  // Utility method to determine status label
  getStatusLabel(status: string | boolean): string {
    if (status === true || status === 'true' || status === 'True') {
      return 'Active';
    }
    return 'Inactive';
  }

  // Seller object definition
  seller = {
    seller_Id: 0,
    company_name: '',
    gst_number: '',
    company_address: '',
    company_email: '',
    company_mobile_number: '',
    logo: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    mobile_number: '',
    address: '',
    status: '',
    created_at: '',
    updated_at: '',
  };

  adminSellers: AdminSeller[] = [];
  isEditModalOpen = false;
  isAddModalOpen = false;
  isViewModalOpen = false;

  // Selected seller for modals
  selectedAdminSeller: AdminSeller = {
    seller_Id: 0,
    company_name: '',
    gst_number: '',
    company_address: '',
    company_email: '',
    company_mobile_number: '',
    logo: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    mobile_number: '',
    address: '',
    status: '',
    created_at: '',
    updated_at: '',
  };

  constructor(private dataService: DataService ) {
    // alert("hello construtor")
  }

  ngOnInit(): void {
      // alert("hello construtor")
    this.getAdminSellers();
    
  }

  getAdminSellers(): void {
    this.dataService.getAdminSellers().subscribe(
      (data: AdminSeller[]) => {
        this.adminSellers = data;
      },
      (error: any) => {
        console.error('Error fetching sellers:', error);
      }
    );
  }

  openViewModal(adminSeller: AdminSeller): void {
    this.selectedAdminSeller = { ...adminSeller };
    this.isViewModalOpen = true;
  }

  closeViewModal(): void {
    this.isViewModalOpen = false;
  }

  openEditModal(adminSeller: AdminSeller): void {
    this.selectedAdminSeller = { ...adminSeller };
    this.isEditModalOpen = true;
  }

  openAddModal(): void {
    this.selectedAdminSeller = {
      seller_Id: 0,
      company_name: '',
      gst_number: '',
      company_address: '',
      company_email: '',
      company_mobile_number: '',
      logo: '',
      status: '',
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      mobile_number: '',
      address: '',
      created_at: '',
      updated_at: '',
    };
    this.isAddModalOpen = true;
  }

  closeModals(): void {
    this.isEditModalOpen = false;
    this.isAddModalOpen = false;
  }

  saveSeller(): void {
    if (this.isEditModalOpen) {
      this.dataService.updateSeller(this.selectedAdminSeller.seller_Id, this.selectedAdminSeller).subscribe(
        (response) => {
          console.log('Seller updated successfully', response);
          this.closeEditModal();
          this.getAdminSellers();
        },
        (error) => {
          console.error('Error updating seller:', error);
        }
      );
    }
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  deleteAdminSeller(id: number | undefined): void {
    if (id !== undefined) {
      this.dataService.deleteSeller(id).subscribe(
        () => {
          this.getAdminSellers();
        },
        (error: any) => {
          console.error('Error deleting seller:', error);
        }
      );
    } else {
      console.error('Error: ID is undefined');
    }
  }

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.seller.logo = this.imagePreview as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  
}
