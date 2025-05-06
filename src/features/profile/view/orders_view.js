import {ProfileModel} from '../model/profile_model.js';
export class OrdersView {
  render() {
      const ordersSection = document.getElementById('orders-section');
      if (!ordersSection) return;

      const orders = ProfileModel.getOrders();

      ordersSection.innerHTML = `
          <h3>Order History</h3>
          <table class="table">
              <thead>
                  <tr>
                      <th>Order #</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Price</th>
                  </tr>
              </thead>
              <tbody>
                  ${orders.map(order => `
                      <tr>
                          <td>${order.orderId}</td>
                          <td>${order.date}</td>
                          <td>${order.status}</td>
                          <td>${order.price}</td>
                      </tr>
                  `).join('')}
              </tbody>
          </table>
      `;
  }
}