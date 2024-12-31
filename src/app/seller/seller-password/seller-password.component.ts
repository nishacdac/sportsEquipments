import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-seller-password',
  templateUrl: './seller-password.component.html',
  styleUrl: './seller-password.component.css'
})
export class SellerPasswordComponent {


  passwordData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private dataService: DataService) {}

  onSubmit(form: any) {
    if (form.valid) {
      if (this.passwordData.newPassword === this.passwordData.confirmPassword) {
        const id = Number(localStorage.getItem('userId')); // Replace with actual user ID logic
        const payload = {
          oldPassword: this.passwordData.oldPassword,
          newPassword: this.passwordData.newPassword
        };

        // Call the API to update the password
        this.dataService.updateSellerPaswword(id, payload).subscribe({
          next: (response) => {
            console.log('Password update successful:', response);
            alert('Password has been reset successfully!');
            form.resetForm();
          },
          error: (error) => {
            console.error('Error updating password:', error);
            alert('Failed to reset password. Please try again.');
          }
        });
      } else {
        alert('Passwords do not match. Please try again.');
      }
    } 
  }

  // Method to reset the form
  resetForm(form: any) {
    form.resetForm();
    this.passwordData = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    }
  }