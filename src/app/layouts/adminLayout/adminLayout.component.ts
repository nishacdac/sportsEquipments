import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './adminLayout.component.html',
  styleUrl: './adminLayout.component.css'
})
export class AdminLayoutsComponent {
  

  // Method to toggle the sidebar visibility from the parent component
  // toggleSidebar() {
  //   const sidebar = document.getElementById('mobile-sidebar');
  //   if (sidebar) {
  //     sidebar.classList.toggle('hidden'); // This will toggle the visibility
  //   }
  // }

//   
 // Method to toggle the sidebar visibility from the parent component
 toggleSidebar() {
  const sidebar = document.getElementById('mobile-sidebar');
  if (sidebar) {
    sidebar.classList.toggle('hidden'); // This will toggle the visibility of sidebar
  }
}
}
