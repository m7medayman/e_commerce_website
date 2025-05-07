import { AuthModel } from "../../../core/models/auth_model.js";

export class ProfileModel {
  static getUserData() {
    this.data = AuthModel.getUser();
    console.log(this.data);
    return{
        name:this.data.name,
        email:this.data.email,
    }
    //   return {
    //       name: 'John Doe',
    //       email: 'john.doe@example.com'
    //   };
  }

  static getAddresses() {
      return [
          { type: 'Billing', street: '123 Long St', city: 'New York', state: 'NY', country: 'USA' },
          { type: 'Shipping', street: '456 Long St', city: 'New York', state: 'NY', country: 'USA' }
      ];
  }

  static getOrders() {
      return [
          { orderId: '#123456', date: 'October 11, 2023', status: 'Delivered', price: '$123.45' },
          { orderId: '#123457', date: 'August 24, 2022', status: 'Delivered', price: '$89.99' },
          { orderId: '#123458', date: 'August 17, 2021', status: 'Delivered', price: '$45.00' }
      ];
  }

  static getWishlist() {
      return [
          { name: 'Tray Table', price: '$15.00', action: 'Add to Cart' },
          { name: 'Sofa', price: '$45.00', action: 'Add to Cart' },
          { name: 'Armchair', price: '$25.00', action: 'Add to Cart' },
          { name: 'Pillow', price: '$10.00', action: 'Add to Cart' }
      ];
  }
}