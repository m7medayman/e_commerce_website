export class CartModel {
  constructor() {
    this.items = [
      { id: 1, name: 'Tray Table', price: 19.00, quantity: 2, url: 'https://images.pexels.com/photos/923192/pexels-photo-923192.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 2, name: 'Tray Table', price: 19.00, quantity: 2, url: 'https://images.pexels.com/photos/923192/pexels-photo-923192.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 3, name: 'Table Lamp', price: 39.00, quantity: 1, url: 'https://images.pexels.com/photos/923192/pexels-photo-923192.jpeg?auto=compress&cs=tinysrgb&w=600' }
    ];
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
  setCoupon(code) {
    if (this.validCoupons.hasOwnProperty(code)) {
      this.couponCode = code;
      return true;
    } else {
      this.couponCode = '';
      return false;
    }
  }

  getDiscountAmount() {
    const subtotal = this.getSubtotal();
    const rate = this.validCoupons[this.couponCode] || 0;
    return subtotal * rate;
  }

  getCartItems() {
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
    return this.getSubtotal() + this.getShippingCost() - this.getDiscountAmount();
  }

}