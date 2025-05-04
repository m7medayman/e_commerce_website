import {OrderModel} from '../../../core/models/order_model.js';
export class CheckoutModel {
  constructor() {
    const data = JSON.parse(localStorage.getItem('checkoutData')) || {
      items: [],
      subtotal: 0,
      shippingCost: 0,
      total: 0,
      shippingOption: 'free'
    };

    this.checkoutData = data;
    this.couponDiscount = 0;
    this.customer = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      shippingAddress: { street: '', country: '', city: '', state: '', zip: '' },
    };

  }

  getItems() {
    return this.checkoutData.items;
  }

  getSubtotal() {
    return this.checkoutData.subtotal;
  }

  getShippingCost() {
    return this.checkoutData.shippingCost;
  }

  getTotal() {
    return this.checkoutData.total;
  }

  getShippingOption() {
    return this.checkoutData.shippingOption;
  }
  calculateDiscountedTotal() {
    return this.getTotal() - this.couponDiscount;
  }
  applyCoupon(code) {
    this.couponDiscount = code.toUpperCase() === 'JENKAMW' ? 25.00 : 0;
  }
  saveOrder() {
    const order = {
      items: this.getItems(),
       total: this.calculateDiscountedTotal(),
      orderCode: `M${Math.floor(Math.random() * 1000)}.AS${Math.floor(Math.random() * 1000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      paymentMethod: 'Cash on Delivery (COD)',
      customer: { ...this.customer },
    };
    localStorage.setItem('orderData', JSON.stringify(order)); // use order_model
    //OrderModel.add();
    return order;
  }
}
