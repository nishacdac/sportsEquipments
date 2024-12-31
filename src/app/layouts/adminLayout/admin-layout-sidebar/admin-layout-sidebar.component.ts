import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout-sidebar',
  templateUrl: './admin-layout-sidebar.component.html',
  styleUrls: ['./admin-layout-sidebar.component.css']
})
// export class AdminLayoutSidebarComponent {
//   // Boolean to track the visibility of the mobile sidebar
//   isSidebarVisible = false;

//   // Method to toggle the sidebar visibility
//   toggleSidebar() {
//     console.log('Sidebar toggled'); // For debugging purpose
//     this.isSidebarVisible = !this.isSidebarVisible;
//   }
// }


export class AdminLayoutSidebarComponent {
  // Boolean to track the visibility of the mobile sidebar
  isSidebarVisible = false;

  // Method to toggle the sidebar visibility
  toggleSidebar() {
    // Check if function is being called
    console.log('toggleSidebar called');
    
    // Toggle the visibility of the sidebar
    this.isSidebarVisible = !this.isSidebarVisible;

    // Log the new state of sidebar visibility
    console.log('Sidebar is visible:', this.isSidebarVisible);
  }
}
