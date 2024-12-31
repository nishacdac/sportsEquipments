// src/app/models/user.ts

// Interface for User
export interface User {
  firstname: string;
  lastname: string;
  email: string;
  mobileNumber: string;
  password: string;
  gender: string;
  RoleId: number;
}

  
  // Interface for LoginUser
  export interface LoginUser {
    email: string;
    password: string;
    RoleId: number; // Make sure this is a number
  }
  

   // Interface for AdminLoginUser
   export interface AdminLoginUser {
    email: string;
    password: string;
    RoleId: number; // Make sure this is a number
  }
  
  // export interface Product {
  //   id: number;
  //   productname: string; // Use camelCase for consistency
  //   category: string;
  //   price: number;
  //   status: string;
  //   imageUrl: string;

  // }
  export interface Product {
    quantity: any;
    id: number;
    product_ID: any;
    product_name: string;
    category_id: number;
    material_type: string;
    image_url: string; 
    in_Active: boolean;
    description: string;
    create_At: string; 
    update_At: string;
    categoryName: string;
    price: number;
  }

  

  export interface Orders {
    orderId: string;
    orderName: string;
    order: string;
    quantity: number;
    totalPrice: string;
    status: string;
  }
  


  export interface Category {
    categoryId: number; // Ensure this is 'number' if the backend returns a number
    name: string;
    description: string;
    createdAt: Date;
    categoryStatus: string;
  }

  // export interface AdminSeller {
  //   id?: number; // Ensure 'id' is optional
  //   companyName: string;
  //   gstNumber: string;
  //   address: string;
  //   email: string;
  //   logo: string;
  //   status: string;
  // }
  
  // seller.component.ts
  export interface AdminSeller {
    seller_Id: number;         
    company_name: string;
    gst_number: string;
    company_address: string;
    company_email: string;
    company_mobile_number: string;
    logo: string;
    first_name?: string;
    last_name?: string;
    email: string;
    gender?: string;
    mobile_number?: string;
    address: string;
    status: string ; // Restrict to valid values
    created_at: string; 
    updated_at: string;
  }


// <----------------admin profile-------------------->
  // export interface User {
  //   username: string;
  //   password: string;
  //   email: string;
  //   fullName: string;
  // }
  

// cartitem data when the customer add something than cart summary is show

  export interface CartItem {
    product_id: number;
    date: string;
    firstName: string;
    lastName: string;
    product_name: string;
    quantity: number;
    price: number;
    image_url: string;
  }

  export interface ChatMessage {
    user: string;
    message: string;
    read: boolean;
  }
  


  // export interface SellerDashboardData {
  //   first_name: string;
  //   product_name: string;
  //   quantity: number;
  // }
  
  export interface SellerDashboardData {
    first_name: string;
    product_name: string;
    quantity: number;
  }



  // nisha da model  edit wala
  export interface Client {
    id: number;
    name:string;
    mobilenumber: string; 
    address: string; 
    image: string; 
    gender: string; 
   
    
  }



export interface Orders {
  customer_id: number;
  mobileNumber: string;
  firstName: string;
  product_name: string;
  quantity: number;
  paymentStatus: string;
}




// reset password for customer 
export interface Client {
  id: number;
  oldpassword:string;
  newpassword:string;
  }
  

////////////Admin Product chart////////////

export interface ProductGraph{
  product_id:number;
  Product_name:string;
  product_quantity:string;

}



// selelr-profile model nisha code 
///////////Seller- Profile/////////////


export interface Seller {
  id: number;
  registration_Id: number;
  firstName: string;
  email:string;
  mobileNumber: string;
  address: string;
  image: string;
  gender: string;
}





