import { OrderModel } from '../../../core/models/order_model.js';
import { AuthModel } from '../../../core/models/auth_model.js';
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
  saveOrderWithOrderModel() {
    const user = AuthModel.getUser();
    if (!user) {
      throw new Error('No user is signed in');
    }

    const orderData = {
      userId: user.userId,
      items: this.getItems(),
      shippingAddress: { ...this.customer.shippingAddress },
      paymentDetails: {
        method: 'Cash on Delivery (COD)',
        subtotal: this.getSubtotal(),
        shippingCost: this.getShippingCost(),
        couponDiscount: this.couponDiscount,
        total: this.getTotal()
      },
      customer: {
        firstName: this.customer.firstName,
        lastName: this.customer.lastName,
        phone: this.customer.phone,
        email: this.customer.email
      }
    };

    const savedOrder = OrderModel.add(orderData);
    localStorage.setItem('latestOrderId', savedOrder.orderId);
    return savedOrder;
  }
}
