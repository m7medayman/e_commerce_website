class CheckoutModel {
  constructor() {
      // Dummy data for testing
      this.items = [
          { id: 'item1', name: 'Tray Table', price: 319.00, quantity: 2, img: './assets/images/table-y.png' },
          { id: 'item2', name: 'Tray Table', price: 319.00, quantity: 2, img: './assets/images/table-y.png' },
          { id: 'item3', name: 'Table Lamp', price: 319.00, quantity: 2, img: './assets/images/table-y.png' },
      ];
      this.couponDiscount = 0;
      this.customer = {
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          shippingAddress: { street: '', country: '', city: '', state: '', zip: '' },
      };
  }

  calculateSubtotal() {
      return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  calculateTotal() {
      return this.calculateSubtotal() - this.couponDiscount;
  }

  applyCoupon(code) {
      this.couponDiscount = code.toUpperCase() === 'JENKAMW' ? 25.00 : 0;
  }

  updateQuantity(itemId, delta) {
      const item = this.items.find(i => i.id === itemId);
      if (item) {
          const newQuantity = item.quantity + delta;
          if (newQuantity > 0) {
              item.quantity = newQuantity;
          } else {
              // Remove item if quantity would be 0 or negative
              this.items = this.items.filter(i => i.id !== itemId);
          }
      }
  }

  saveOrder() {
      const order = {
          items: [...this.items],
          total: this.calculateTotal(),
          orderCode: `M${Math.floor(Math.random() * 1000)}.AS${Math.floor(Math.random() * 1000)}`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          paymentMethod: 'Cash on Delivery (COD)',
          customer: { ...this.customer },
      };
      localStorage.setItem('orderData', JSON.stringify(order));
      return order;
  }
}

export default CheckoutModel;