// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { DataService } from '../../../services/data.service';

// @Component({
//   selector: 'app-customer-header',
//   templateUrl: './customer-header.component.html',
//   styleUrls: ['./customer-header.component.css']
// })
// export class CustomerHeaderComponent implements OnInit {
//   isDropdownOpen: boolean = false;
//   totalQuantity: number = 0;      

//   constructor(
//     private router: Router,
//     private http: HttpClient,
//     private dataService: DataService
//   ) {}

//   ngOnInit(): void {
//     this.getCartData();
//   }

//   toggleDropdown(): void {
//     this.isDropdownOpen = !this.isDropdownOpen;
//   }

//   getCartData(): void {
//     const userId = localStorage.getItem('userId');

//     if (userId) {
//       const userIdNumber = Number(userId);
//       if (!isNaN(userIdNumber)) {
//         this.dataService.getCartSummary(userIdNumber).subscribe(response => {
//           if (response && response[0]?.totalQuantity !== undefined) {
//             this.totalQuantity = response[0].totalQuantity;
//           }
//         });
//       } else {
//         console.error('Invalid userId in localStorage');
//       }
//     } else {
//       console.error('User ID not found in localStorage');
//     }
//   }

//   onLogout(): void {
//     localStorage.clear(); 
//     this.router.navigate(['/home']); 
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { DataService } from '../../../services/data.service';

// @Component({
//   selector: 'app-customer-header',
//   templateUrl: './customer-header.component.html',
//   styleUrls: ['./customer-header.component.css']
// })
// export class CustomerHeaderComponent implements OnInit {
//   isDropdownOpen: boolean = false;        // Dropdown visibility
//   isMobileMenuOpen: boolean = false;      // Mobile menu visibility
//   totalQuantity: number = 0;              // Cart total items

//   constructor(
//     private router: Router,
//     private http: HttpClient,
//     private dataService: DataService
//   ) {}

//   ngOnInit(): void {
//     this.getCartData(); // Fetch cart quantity
//   }

//   // Toggle profile dropdown
//   toggleDropdown(): void {
//     this.isDropdownOpen = !this.isDropdownOpen;
//   }

//   // Toggle mobile menu
//   toggleMobileMenu(): void {
//     this.isMobileMenuOpen = !this.isMobileMenuOpen;
//   }

//   // Fetch cart data from API
//   getCartData(): void {
//     const userId = localStorage.getItem('userId');

//     if (userId) {
//       const userIdNumber = Number(userId);
//       if (!isNaN(userIdNumber)) {
//         this.dataService.getCartSummary(userIdNumber).subscribe(response => {
//           if (response && response[0]?.totalQuantity !== undefined) {
//             this.totalQuantity = response[0].totalQuantity;
//           }
//         });
//       } else {
//         console.error('Invalid userId in localStorage');
//       }
//     } else {
//       console.error('User ID not found in localStorage');
//     }
//   }

//   // Logout the user
//   onLogout(): void {
//     localStorage.clear();
//     this.router.navigate(['/home']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent implements OnInit {
  isDropdownOpen: boolean = false;        // Dropdown visibility
  isMobileMenuOpen: boolean = false;      // Mobile menu visibility
  totalQuantity: number = 0;              // Cart total items

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getCartData(); // Fetch cart quantity
  }

  // Toggle profile dropdown
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Close dropdown and navigate to profile page
  navigateToProfile(): void {
    this.isDropdownOpen = false; // Close dropdown
    this.router.navigate(['/customer/my-profile']); // Navigate to profile
  }

  // Close dropdown and navigate to reset password page
  navigateToResetPassword(): void {
    this.isDropdownOpen = false; // Close dropdown
    this.router.navigate(['/customer/reset-password']); // Navigate to reset password
  }

  // Toggle mobile menu
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Fetch cart data from API
  getCartData(): void {
    const userId = localStorage.getItem('userId');

    if (userId) {
      const userIdNumber = Number(userId);
      if (!isNaN(userIdNumber)) {
        this.dataService.getCartSummary(userIdNumber).subscribe(response => {
          if (response && response[0]?.totalQuantity !== undefined) {
            this.totalQuantity = response[0].totalQuantity;
          }
        });
      } else {
        console.error('Invalid userId in localStorage');
      }
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  // Logout the user
  onLogout(): void {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}


