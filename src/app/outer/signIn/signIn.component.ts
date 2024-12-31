import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { LoginUser } from '../../models/user';
import {jwtDecode} from 'jwt-decode';


@Component({
  selector: 'app-sign-in',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css'],
})
export class SignInComponent {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    RoleId: new FormControl('', [Validators.required]), // Ensure roleId is a number
  });

  selectedTab: string = 'seller'; // Default tab selection

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  // Getter for emai
  get email() {
    return this.signInForm.get('email');
  }

  // Getter for password
  get password() {
    return this.signInForm.get('password');
  }

  // Getter for roleId
  get RoleId() {
    return this.signInForm.get('RoleId');
  }


  // Method to handle sign-in
  signInUser() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const loginUser = this.signInForm.value as unknown as LoginUser;

    this.authService.login(loginUser).subscribe(
      (response) => { 

        const token = response.token; // Assuming the token is returned in `response.token`
      if (token) {
        // Save the token to localStorage
        localStorage.setItem('authToken', token);

        // Decode the token to extract the Id
        const decodedToken: any = jwtDecode(token); // Decode the JWT
        const userId = decodedToken.Id; // Extract the `Id` field
        const firstName = decodedToken.FirstName;
        if (userId && firstName) {
          localStorage.setItem('userId', userId.toString()); // Save Id to localStorage
          localStorage.setItem('firstName', firstName);
        }
      }


        if (loginUser.RoleId == 2) {
          this.router.navigate(['/customer/customer-dashboard']);
          console.log('Navigating to customer');
          console.log('Login successful', response);
          // Redirect to customer dashboard
        } else if (loginUser.RoleId == 3) {
          this.router.navigate(['/seller']); // Correct if route exists

          console.log('Navigating to seller');
        }
        this.snackBar.open('Login successful', 'Close', { duration: 3000 });
      },
      (error) => {
        console.error('Login failed', error);
        this.snackBar.open('Login failed', 'Close', { duration: 3000 });
      }
    );
  }
}
