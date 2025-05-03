class OrderCompleteModel {
  constructor() {
      // Dummy data for testing (loaded from localStorage or default)
//       this.order = JSON.parse(localStorage.getItem('orderData')) || {
//           items: [
//               { name: 'Tray Table', quantity: 2, img: './assets/images/table-y.png' },
//               { name: 'Tray Table', quantity: 2, img: './assets/images/table-y.png' },
//               { name: 'Table Lamp', quantity: 2, img: './assets/images/table-y.png' },
//           ],
//           total: 957.00,
//           orderCode: '#M123.AS679',
//           date: 'October 19, 2023',
//           paymentMethod: 'Cash on Delivery (COD)',
//       };
//   }

const data = JSON.parse(localStorage.getItem('checkoutData')) || {
    items: [],
    subtotal: 0,
    shippingCost: 0,
    total: 0,
    shippingOption: 'free',
    
};
this.order = data ;
this.order.orderCode =  '#M123.AS679';
this.order.paymentMethod = 'Cash on Delivery (COD)';
}
  getOrder() {
    console.log(this.order);
      return this.order;
}
}

export default OrderCompleteModel;