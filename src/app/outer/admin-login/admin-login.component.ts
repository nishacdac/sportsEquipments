import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { LoginUser } from '../../models/user';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  AdminForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    roleId: new FormControl<number>(1, [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // Getters for form controls
  get email() {
    return this.AdminForm.get('email');
  }

  get password() {
    return this.AdminForm.get('password');
  }

  get roleId() {
    return this.AdminForm.get('roleId');
  }

  signInUser() {
    if (this.AdminForm.invalid) {
      this.AdminForm.markAllAsTouched();
      return;
    }

    const loginUser = this.AdminForm.value as LoginUser;

    this.authService.login(loginUser).subscribe(
      (response) => {
        const token = response.token;

        if (token) {
          // Save token to localStorage
          localStorage.setItem('authToken', token);

          // Decode token to extract user details
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.Id;
          const firstName = decodedToken.FirstName;

          if (userId && firstName) {
            localStorage.setItem('userId', userId.toString());
            localStorage.setItem('firstName', firstName);
          }

          // Navigate based on role
          if (loginUser.RoleId === 1) {
            this.router.navigate(['admin/user-mangement']);
            console.log('Navigating to admin dashboard');
          } else {
            console.log('Role not recognized');
          }

          // Show success message
          this.toastr.success('Login successful');
          this.snackBar.open('Login successful', 'Close', { duration: 3000 });
        } else {
          console.error('Token not found in response');
        }
      },
      (error) => {
        console.error('Login failed', error);
        this.toastr.error('Login failed');
        this.snackBar.open('Login failed', 'Close', { duration: 3000 });
      }
    );
  }
}











// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { AuthService } from '../../auth/auth.service';
// import { LoginUser } from '../../models/user';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-admin-login',
//   templateUrl: './admin-login.component.html',
//   styleUrls: ['./admin-login.component.css']
// })
// export class AdminLoginComponent {
//   AdminForm = new FormGroup({
//     email: new FormControl('', [Validators.required, Validators.email]), 
//     password: new FormControl('', [Validators.required]), 
//     roleId: new FormControl<number>(1, [Validators.required]), 
//   });

//   constructor(
//     private authService: AuthService,  
//     private snackBar: MatSnackBar,     
//     private router: Router,
//     private tostr: ToastrService           
//   ) {}


// get email() {
//   return this.AdminForm.get('email');
// }

// get password() {
//   return this.AdminForm.get('password');
// }


// get roleId() {
//   return this.AdminForm.get('roleId');
// }
//   signInUser() {
//     if (this.AdminForm.invalid) {
//       this.AdminForm.markAllAsTouched();
//       return;
//     }

//     const loginUser = this.AdminForm.value as LoginUser;

//     this.authService.login(loginUser).subscribe(
//       (response) => {
//         console.log('Login successful', response);
//         this.tostr.success('Login successful');
    
//         const token = response.token; 
//         localStorage.setItem('token', response.token);

//         if (loginUser.RoleId === 1) {
//           this.router.navigate(['/admin/user-mangement']);
//         } else {
//           console.log('Role not recognized');
//         }
        
//         this.snackBar.open('Login successful', 'Close', { duration: 3000 });
//       },
//       (error) => {
//         console.error('Login failed', error);
//         this.snackBar.open('Login failed', 'Close', { duration: 3000 });
//         this.tostr.error('Login failed');
//       }
//     );
    
//   }
// }
