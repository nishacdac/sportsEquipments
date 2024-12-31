import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Client } from '../../../models/user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  myProfileForm!: FormGroup;
  isEditing: boolean = false;
  userProfile: any = null; // Nullable initially to indicate loading state
  defaultImage: string = 'assets/default-profile.jpg'; // Default profile image if none exists

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserProfile(); // Fetch dynamic data
  }

  initializeForm(): void {
    // Initialize the form with the name field set to read-only
    this.myProfileForm = this.fb.group({
      name: [{ value: '', disabled: true }], // Read-only field
      mobileNumber: ['', [ Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      email: ['', [ Validators.email]],
      address: [''],
      image: ['userProfile'],
    });
  }

  loadUserProfile(): void {
    const clientId = Number(localStorage.getItem('userId'));
    this.dataService.getClient(clientId).subscribe({
      next: (data) => {
        this.userProfile = data;
        this.myProfileForm.patchValue(data); // Populate the form with data fetched from the registration table
      },
      error: (err) => console.error('Error loading user profile:', err)
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;

    if (!this.isEditing) {
      this.myProfileForm.patchValue(this.userProfile); // Reset to original profile values
    }
  }

  updateProfile(): void {
    // Check if the form is valid and editing mode is enabled
    if (this.myProfileForm.valid && this.isEditing) {
      // Retrieve the user ID from localStorage and parse it as a number
      const clientId = Number(localStorage.getItem('userId'));
  
      // Validate that the userId is a valid number
      if (!isNaN(clientId)) {
        const updatedClient: Client = this.myProfileForm.value;
  
        // Call the data service to update the client by ID
        this.dataService.updateClient(clientId, updatedClient).subscribe({
          next: (response) => {
            console.log('Profile updated:', response);
            this.userProfile = response; // Update the userProfile data
            this.isEditing = false; // Exit editing mode
            alert('Profile updated successfully.');
            this.loadUserProfile();
          },
          error: (err) => {
            console.error('Error updating profile:', err);
            alert('Failed to update profile.');
          },
        });
      } else {
        alert('Invalid user ID found in localStorage.');
      }
    } else {
      alert('Form is invalid or not in edit mode.');
    }
  }
  

  onSubmit(): void {
    if (this.myProfileForm.valid) {
      const updatedProfile = this.myProfileForm.value;
      const clientId = Number(localStorage.getItem('userId'));
      this.dataService.updateClient(clientId, updatedProfile).subscribe({
        next: (updatedData) => {
          console.log('Profile updated:', updatedData);
          this.userProfile = updatedData; // Update local profile data
          this.toggleEdit();
        },
        error: (err) => console.error('Error updating profile:', err)
      });
    } else {
      console.error('Form is invalid');
    }
  }

  /**
   * Handle profile image change.
   * @param event The file input change event.
   */
  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.userProfile.profileImage = reader.result as string;
        const base64Image = reader.result as string;

        // Set the base64 image in the form
        this.myProfileForm.patchValue({ image: base64Image });
      };
      reader.readAsDataURL(file); // Convert the image to base64 format
      

}
}
}

