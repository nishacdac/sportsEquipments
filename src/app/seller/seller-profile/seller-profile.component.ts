import { Component } from '@angular/core';
import { Seller } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrl: './seller-profile.component.css'
})
export class SellerProfileComponent {
  sellerProfileForm!: FormGroup;
  isEditing: boolean = false;
  sellerProfile: Seller | null = null;
  defaultImage: string = 'assets/default-profile.jpg';
  profileImage : string ='';

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSellerProfile();
  }

  initializeForm(): void {
    this.sellerProfileForm = this.fb.group({
      firstName: [{ value: '', disabled: true }], // Read-only field
      mobileNumber: ['', [Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      email: ['', [Validators.email]],
      address: [''],
      image: ['']
    });
  }

  loadSellerProfile(): void {
    const sellerId = Number(localStorage.getItem('userId'));
    if (!isNaN(sellerId)) {
      this.dataService.getSellerprofile(sellerId).subscribe({
        next: (data: Seller) => {
          this.sellerProfile = data;
          this.profileImage= this.sellerProfile.image;
          if (data) {
            this.sellerProfileForm.patchValue(data);
          }
        },
        error: (err: any) => console.error('Error loading seller profile:', err)
      });
    } else {
      console.error('Invalid seller ID in localStorage.');
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.sellerProfile) {
      this.sellerProfileForm.patchValue(this.sellerProfile);
      this.profileImage = this.sellerProfile.image;
    }
  }

  updateProfile(): void {
    if (this.sellerProfileForm.valid && this.isEditing) {
      const sellerId = Number(localStorage.getItem('userId'));
      if (!isNaN(sellerId)) {
        const updatedSeller: Seller = this.sellerProfileForm.getRawValue();
        updatedSeller.id=sellerId;
        this.dataService.updateSellerprofile(updatedSeller).subscribe({
          next: (response: Seller) => {
            console.log('Profile updated:', response);
            
            this.sellerProfile = response;
            this.profileImage = this.sellerProfile.image;
            this.isEditing = false;
            alert('Profile updated successfully.');
            this.loadSellerProfile();
          },
          error: (err: any) => {
            console.error('Error updating profile:', err);
            alert('Failed to update profile.');
          }
        });
      } else {
        alert('Invalid seller ID found in localStorage.');
      }
    } else {
      alert('Form is invalid or not in edit mode.');
    }
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.sellerProfileForm.patchValue({ image: base64Image });
        this.profileImage = base64Image;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.sellerProfileForm.valid && this.isEditing) {
      this.updateProfile();
    }
  }
}


