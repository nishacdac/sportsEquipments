import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './outer/home/home.component';
import { AboutComponent } from './outer/about/about.component';
import { ContactusComponent } from './outer/contactus/contactus.component';
import { SignupComponent } from './outer/signup/signup.component';
import { OuterLayoutComponent } from './layouts/outerLayout/outerLayout.component';
import { AdminLayoutsComponent } from './layouts/adminLayout/adminLayout.component';
import { CustomerLayoutComponent } from './layouts/customerLayout/customerLayout.component';
import { HeaderComponent } from './layouts/outerLayout/header/header.component';
import { FooterComponent } from './layouts/outerLayout/footer/footer.component';
import { CustomerFooterComponent } from './layouts/customerLayout/customer-footer/customer-footer.component';
import { FavouritesComponent } from './customer/favourites/favourites.component';
import { SignInComponent } from './outer/signIn/signIn.component';
import { SellerLayoutComponent } from './layouts/sellerLayout/sellerLayout.component';
import { UserMangementComponent } from './admin/user-mangement/user-mangement.component';
// import { ProfileComponent } from './customer/profile/profile.component';
import { SettingsComponent } from './customer/settings/settings.component';
import { ChatsComponent } from './customer/chats/chats.component';
import { AdminLayoutSidebarComponent } from './layouts/adminLayout/admin-layout-sidebar/admin-layout-sidebar.component';
import { SellerInfoComponent } from './seller/seller-info/seller-info.component';
import { AddressComponent } from './customer/address/address.component';
import { AdminLoginComponent } from './outer/admin-login/admin-login.component';
import { ProductsComponent } from './admin/products/products.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AddSellerComponent } from './admin/admin-seller/add-seller/add-seller.component';
import { ListSellerComponent } from './admin/admin-seller/list-seller/list-seller.component';
import { CustomerOrdersComponent } from './customer/customer-orders/customer-orders.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { ListProductComponent } from './admin/admin-products/list-product/list-product.component';
import { AddProductComponent } from './admin/admin-products/add-product/add-product.component';
import { AdminChatsComponent } from './admin/admin-chats/admin-chats.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { MyProfileComponent } from './customer/profile/my-profile/my-profile.component';
import { ResetPasswordComponent } from './customer/profile/reset-password/reset-password.component';
import { SellerProfileComponent } from './seller/seller-profile/seller-profile.component';
import { SellerPasswordComponent } from './seller/seller-password/seller-password.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';


// Define routes
const routes: Routes = [
  {
    path: '', // Main route for outer layout
    component: OuterLayoutComponent, // Use Outer Layout
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contactus', component: ContactusComponent },
      { path: 'signIn', component: SignInComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'admin-login', component: AdminLoginComponent },

      { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default to Home
    ],
  },

  // *************************************CustomerLayoutComponent*************************
  {
    path: 'customer',
    component: CustomerLayoutComponent,
    children: [
      { path: '', redirectTo: 'customer-dashboard', pathMatch: 'full' }, 
      { path: 'customer-dashboard', component: CustomerDashboardComponent },
      { path: 'customer-orders', component: CustomerOrdersComponent },
      { path: 'address', component: AddressComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'chats', component: ChatsComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },

  // ***************************************SellerLayout*********************************
  {
    path: 'seller',
    component: SellerLayoutComponent,
    children: [
      { path: 'seller-dashboard', component: SellerDashboardComponent }, 
      { path: 'seller-info', component: SellerInfoComponent },
      { path: 'seller-profile', component: SellerProfileComponent },
      { path: 'seller-password', component: SellerPasswordComponent },
      { path: '', redirectTo: 'seller-dashboard', pathMatch: 'full' }, 
    ],
  },

  // *************************************AdminLayout******************************
  {
    path: 'admin',
    component: AdminLayoutsComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'admin-categories', component: AdminCategoriesComponent },
      { path: 'admin-orders', component: AdminOrdersComponent },
      { path: 'add-seller', component: AddSellerComponent },
      { path: 'list-seller', component: ListSellerComponent },
     { path: 'user-mangement', component: UserMangementComponent },  
      { path: 'list-product', component: ListProductComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'admin-chats', component: AdminChatsComponent },
      {path: 'admin-dashboard',component:AdminDashboardComponent},
      { path: '', redirectTo: 'user-management', pathMatch: 'full' }, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
