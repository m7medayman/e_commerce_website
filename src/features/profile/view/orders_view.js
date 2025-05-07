import {OrderModel} from '../../../core/models/order_model.js';
import { AuthModel } from '../../../core/models/auth_model.js';

export class OrdersView {
    render() {
        const ordersSection = document.getElementById('orders-section');
        if (!ordersSection) {
            console.error("Orders section element not found.");
            return;
        }

        const user = AuthModel.getUser();
        if (!user) {
            console.warn("No user logged in.");
            ordersSection.innerHTML = `<p class="text-muted">Please log in to view orders.</p>`;
            return;
        }

        try {
            const orders = OrderModel.getByUserId(user.userId);
            if (!orders || orders.length === 0) {
                console.warn(`No orders found for user ${user.userId}.`);
                ordersSection.innerHTML = `<p class="text-muted">No orders found.</p>`;
                return;
            }

            ordersSection.innerHTML = `
                <h3 class="mb-4">Orders</h3>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.map(order => `
                            <tr>
                                <td>${order.orderId}</td>
                                <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>${order.status}</td>
                                <td>$${order.totalAmount.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } catch (error) {
            console.error("Error rendering orders:", error.message);
            ordersSection.innerHTML = `<p class="text-danger">An error occurred while loading orders. Please try again.</p>`;
        }
    }
}