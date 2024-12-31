import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AdminLoginUser,
  AdminSeller,
  CartItem,
  Category,
  Client,
  LoginUser,
  Orders,
  Product,
  ProductGraph,
  Seller,
  SellerDashboardData,
  User,
} from '../models/user';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseApiUrl = 'https://localhost:7232/api'; // Base URL for API endpoints

  constructor(private http: HttpClient) {}




  // <--------------------------------Login nd registration------------------------------------->

  // User Registration (POST request)
  registerUser(data: User): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/Equipment/register`, data);
  }


  //customer registration////

  registerCustomer(data: User): Observable<any>{
    return this.http.post('${this.baseApiUrl}/Equipment/Customerregister',data);
  }


  // For normal user login
  loginUser(data: LoginUser): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/users/login`, data);
  }

  // For admin login
  loginAdmin(data: AdminLoginUser): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/Equipment/adminlogin`, data); 
  }







  // <------------------------------Add Product admin------------------------------------>

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseApiUrl}/seller/allproduct`);
  }


  addProduct(product: Product, categoryName: string): Observable<Product> {
    return this.http.post<Product>(`${this.baseApiUrl}/seller/product?category_name=${categoryName}`, product);
  }

  // Update an existing product
  updateProduct(id:number,product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseApiUrl}/seller/productby/${id}`,product);
  }

  // Delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/seller/productby{id}/${id}`);
  }





  
  // <----------------- orders data for seller pge--------------------->
  
  // Add a new order
  postOrders(order: Orders): Observable<Orders> {
    return this.http.post<Orders>(`${this.baseApiUrl}/seller/order`, order);
  }

  // Update an existing order
  updateOrders(order: Orders): Observable<Orders> {
    return this.http.put<Orders>(
      `${this.baseApiUrl}/seller/orderby/${order.orderId}`,
      order
    );
  }

  // Delete an order
  deleteOrders(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/seller/orderby/${id}`);
  }




//<----------------------------------client product(pagination)------------------------------------->

// Fetch all products
getProductsdata(): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.baseApiUrl}/Client/products`);
}

// Search products
getSearchProducts(searchQuery: string, pageIndex: number = 0, pageSize: number = 1): Observable<Product[]> {
  const url = `${this.baseApiUrl}/Client/products?pageIndex=${pageIndex}&pageSize=${pageSize}&searchValue=${searchQuery}`;
  return this.http.get<Product[]>(url);
}






// <--------------------------------category data for admin---------------------------------------->

  // Category data for admin layout
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.baseApiUrl}/AdminSeller/allcategory`
    );
  }

  // Add a new category (POST request)
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      `${this.baseApiUrl}/AdminSeller/category`,
      category
    );
  }

  // Update an existing category (PUT request)
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      `${this.baseApiUrl}/AdminSeller/updatecategoryby/${category.categoryId}`,
      category
    );
  }

  // Delete a category (DELETE request)
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseApiUrl}/AdminSeller/deletecategoryby/${id}`
    );
  }



// <------------------------------seller data for admin---------------------------------------->


  // seller data for admin dashbaord
  getAdminSellers(): Observable<AdminSeller[]> {
    return this.http.get<AdminSeller[]>(
      `${this.baseApiUrl}/AdminSeller/allSeller`
    );
  }

  addSeller(adminSeller: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/AdminSeller/seller`,adminSeller);
  }

 
  updateSeller(id: number, adminSeller: AdminSeller): Observable<any> {
    const url = `https://localhost:7232/api/AdminSeller/sellerby/${id}`;
    return this.http.put(url, adminSeller);
  }
  

  deleteSeller(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/AdminSeller/${id}`);
  }






  // <------------------------Admin profile------------------------------------>

  // Get the current admin profile
  getAdminProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/admin/profile`);
  }

  // Upload a new profile image
  uploadProfileImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/admin/profile/upload`, formData);
  }


  // <-----------------------------------Add to Cart------------------------------------------->
  
 // Method to add product to cart
 addToCart(customerId: string, productName: string): Observable<any> {
  const url = `${this.baseApiUrl}/Client?customerId=${encodeURIComponent(customerId)}&productName=${encodeURIComponent(productName)}`;
  return this.http.post(url, {});
}


 // Method to get cart summary with total quantity
 getCartSummary(userId: number): Observable<any> {
  const url = `${this.baseApiUrl}/Client/cart/${userId}`;
  return this.http.get(url);
}


// <----------------------------------cartItems------------------------------------------->
getCartItems(): Observable<CartItem[]> {
  return this.http.get<CartItem[]>('https://localhost:7232/api/Client/cart');
}


deleteCartItems(product_id: number): Observable<any> {
  return this.http.delete<void>(`${this.baseApiUrl}/Client/cart/${product_id}`);

}




updateCartItemQuantity(productId: number, quantity: number): Observable<any> {
  const url = `https://localhost:7232/api/Client/Updatecart/${productId}?quantity=${quantity}`;
  return this.http.put(url, {}); // No body needed if quantity is passed as a query parameter
}




// <----------------------sellerData for seller dashbaord--------------------------------->
// seller data for admin dashboard
getSellerDashbaord(userId: number): Observable<SellerDashboardData[]> {
  const apiUrl = `https://localhost:7232/api/Client/sellerData/${userId}`;
  return this.http.get<SellerDashboardData[]>(apiUrl);
}

// edit data nisha da code hai 

getClient(Id: number): Observable<Client> {
  return this.http.get<Client>(`${this.baseApiUrl}/Client/get-client-info/${Id}`);
}


updateClient(id: number, client: Client): Observable<Client> {
  return this.http.put<Client>(`${this.baseApiUrl}/Client/${id}`, client);
}



// <----------------------------admin orders part hai------------------------------------->

getOrders(): Observable<Orders[]> {
  return this.http.get<Orders[]>(`${this.baseApiUrl}/AdminSeller/allOrders`); // Ensure the API URL is correct
}



// <--------------------------reset password fro customer part--------------------------------->
updateResetPaswword(id: number, payload: { oldPassword: string; newPassword: string }): Observable<Client> {
  return this.http.put<Client>(`${this.baseApiUrl}/Client/reset-password/${id}`, payload);
}


////////////seller- Profile///////////


getSellerprofile(id: number): Observable<Seller> {
  return this.http.get<Seller>(`${this.baseApiUrl}/Client/get-seller-profile?Id=${id}`);
}

updateSellerprofile(seller: Seller): Observable<Seller> {
  return this.http.put<Seller>(`${this.baseApiUrl}/Client/update-profile-id`, seller);
}


/////////////Seller-Password/////////////////

updateSellerPaswword(id: number, payload: { oldPassword: string; newPassword: string }): Observable<Client> {
  return this.http.put<Client>(`${this.baseApiUrl}/Client/reset-password/${id}`, payload);
}


//////////Admin product chart////////////////

getProductChart(): Observable<ProductGraph[]> {
  return this.http.get<ProductGraph[]>(`${this.baseApiUrl}/seller/ProductChart`); // Ensure the API URL is correct
}




}
