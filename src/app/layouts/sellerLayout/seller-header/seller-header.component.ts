// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-seller-header',
//   templateUrl: './seller-header.component.html',
//   styleUrl: './seller-header.component.css'
// })
// export class SellerHeaderComponent {


//   isDropdownOpen: boolean = false; 

//   constructor(private router: Router) {}

//   toggleDropdown(): void {
//     this.isDropdownOpen = !this.isDropdownOpen;
//   }

//   navigateTo(route: string): void {
//     this.isDropdownOpen = false; 
//     this.router.navigate([`/${route}`]);
//   }

//   onLogout(): void {
//     this.isDropdownOpen = false; 
//     console.log('User logged out');
//     localStorage.removeItem('token');
//     this.router.navigate(['/signIn'])
//   }



// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.css']
})
export class SellerHeaderComponent {
  isDropdownOpen: boolean = false; // Track whether the dropdown is open
  isNavbarOpen: boolean = false; // Track whether the mobile navbar is open

  constructor(private router: Router) {}

  // Toggle the dropdown visibility
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Toggle the visibility of the mobile navbar
  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  // Close the mobile navbar
  closeNavbar(): void {
    this.isNavbarOpen = false; // Close the mobile navbar after a click
  }

  // Close dropdown and navigate to the specified route
  navigateTo(route: string): void {
    this.isDropdownOpen = false; // Close the dropdown
    this.router.navigate([route]); // Navigate to the selected route
  }

  // Handle logout functionality
  onLogout(): void {
    this.isDropdownOpen = false; // Close dropdown
    console.log('User logged out');
    localStorage.removeItem('token'); // Remove token
    this.router.navigate(['/signIn']); // Navigate to the SignIn page
  }
}
