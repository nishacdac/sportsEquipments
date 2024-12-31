import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.css'],
})
export class AddSellerComponent {
  // Define the seller object
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

  // Inject the DataService and Router
  constructor(private dataService: DataService, private router: Router) {}

  // Method to submit the seller
  submitSeller() {
    console.log('Form submitted:', this.seller);
  
    // Call the addSeller service and handle the response
    this.dataService.addSeller(this.seller).subscribe({
      
      next: (response) => {
        console.log('Seller added successfully:', response);
        alert('Seller added successfully!');
        // this.router.navigate(['../list-seller']); // Navigate to the seller page
        this.router.navigate(['../list-seller']);

      },
      error: (error) => {
        console.error('Error adding seller:', error);
        alert('Failed to add seller. Please try again.');
      }
    });
  }


  selectedFile: File | null = null; // Holds the selected file
  imagePreview: string | ArrayBuffer | null = null; // For displaying the image preview



  // Triggered when a file is selected
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement; 
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      // Create an image preview (Base64 encoding)
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Set the Base64 image preview
        this.seller.logo = this.imagePreview as string; // Store the base64 string in seller.logo
      };
      reader.readAsDataURL(this.selectedFile); // Convert the file to Base64
    }
  }

  

}  