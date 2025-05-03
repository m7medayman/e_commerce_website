class CheckoutModel {
  constructor(cartData) {
    // this.items = [];
    this.items = Array.isArray(cartData.items) ? [...cartData.items] : [];
    // Shipping options and selected shipping from Cart
    this.shippingOptions = cartData.shipping || { free: 0, express: 15, pickUp: 21 };
    this.selectedShipping = cartData.selectedShipping || 'free';
    // Subtotal, shipping cost, and total directly from Cart
    this.subtotal = cartData.subtotal || 0;
    this.shippingCost = cartData.shippingCost || 0;
    this.cartTotal = cartData.total || 0; // Total from Cart (before Checkout 
        
    this.couponDiscount = 0;
    this.customer = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        shippingAddress: { street: '', country: '', city: '', state: '', zip: '' },
    };

    // const data = JSON.parse(localStorage.getItem('checkout')) || {
    //     items: [],
    //     subtotal: 0,
    //     shippingCost: 0,
    //     total: 0
    //   };
  
    //   this.items = data.items;
    //   this.subtotal = data.subtotal;
    //   this.shippingCost = data.shippingCost;
    //   this.total = data.total;

      
    }
  
    // getItems() {
    //   return this.items;
    // }
  
    // getSubtotal() {
    //   return this.subtotal;
    // }
  
    // getShippingCost() {
    //   return this.shippingCost;
    // }
  
    // getTotal() {
    //     return this.getTotal;
    // }
    


  calculateDiscountedTotal() {
      return this.subtotal - this.couponDiscount;
  }

  applyCoupon(code) {
      this.couponDiscount = code.toUpperCase() === 'JENKAMW' ? 25.00 : 0;
  }

//   updateQuantity(itemId, delta) {
//       const item = this.items.find(i => i.id === itemId);
//       if (item) {
//           const newQuantity = item.quantity + delta;
//           if (newQuantity > 0) {
//               item.quantity = newQuantity;
//           } else {
//               // Remove item if quantity would be 0 or negative
//               this.items = this.items.filter(i => i.id !== itemId);
//           }
//       }
//   }

  saveOrder() {
      const order = {
          items: [...this.items],
        //   total: this.calculateTotal(),
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