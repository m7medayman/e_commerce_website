import { CartModel } from "../../../core/models/cart_model.js";
import { ProductModel } from "../../../core/models/product_model.js";
export class CartDataModel {
  constructor() {
    // this.items = [
    //   { id: 1, name: 'Tray Table', price: 19.00, quantity: 2, url: 'https://images.pexels.com/photos/923192/pexels-photo-923192.jpeg?auto=compress&cs=tinysrgb&w=600' },
    //   { id: 2, name: 'Tray Table', price: 19.00, quantity: 2, url: 'https://images.pexels.com/photos/923192/pexels-photo-923192.jpeg?auto=compress&cs=tinysrgb&w=600' },
    //   { id: 3, name: 'Table Lamp', price: 39.00, quantity: 1, url: 'https://images.pexels.com/photos/923192/pexels-photo-923192.jpeg?auto=compress&cs=tinysrgb&w=600' }
    // ];
    this.userId = 'user-1';
    const cart = CartModel.getByUserId(this.userId);
    this.items = cart.items.map(item => {
      const product = ProductModel.getById(item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: product ? product.name : 'Unknown',
        url: product ? product.detailedImages[0] : ''
      };
    });
    this.shipping = {
      free: 0,
      express: 15,
      pickUp: 21
    };
    this.selectedShipping = 'free';
    this.couponCode = '';
    this.validCoupons = {
      SAVE10: 0.1, // 10% discount
      SAVE20: 0.2  // 20% discount
    };
  }

  getCartItems() {
    console.log(this.items);
    return this.items;

  }

  getSubtotal() {
    return this.items.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }
  updateQuantity(index, change) {
    this.items[index].quantity = Math.max(1, this.items[index].quantity + change);
  }
  removeItem(index) {
    this.items.splice(index, 1);
    // CartModel.removeItem(this.userId,this.items[index].productId);
  }
  setShipping(option) {
    if (this.shipping.hasOwnProperty(option)) {
      this.selectedShipping = option;
    }
  }
  getShippingOption() {
    return this.selectedShipping;
  }
  getShippingCost() {
    return this.shipping[this.selectedShipping];
  }
  getTotal() {
    return this.getSubtotal() + this.getShippingCost();
  }
  getCheckoutData() {
    return {
      items: this.items,
      subtotal: this.getSubtotal(),
      shippingCost: this.getShippingCost(),
      total: this.getTotal(),
      shippingOption: this.getShippingOption()
    };
  }

}