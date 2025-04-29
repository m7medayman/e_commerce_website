class OrderModel {
    static STORAGE_KEY = 'orders';

    static getAll() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    }

    static getById(orderId) {
        return this.getAll().find(order => order.orderId === orderId);
    }

    static getByUserId(userId) {
        return this.getAll().filter(order => order.userId === userId);
    }

    static add({ userId, items, shippingAddress, paymentDetails }) {
        /* items =[{id: "product-1",
        quantity: 2,
        price: 100} ,
        {id: "product-2",
        quantity: 3,
        price: 100}
        
        ]*/
        const orders = this.getAll();
        const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const order = {
            orderId: generateUUID(),
            userId,
            items,
            totalAmount,
            shippingAddress,
            paymentDetails,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        orders.push(order);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
        return order;
    }

    static update(orderId, updates) {
        const orders = this.getAll();
        const order = orders.find(o => o.orderId === orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        Object.assign(order, updates, { updatedAt: new Date().toISOString() });
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
        return order;
    }

    static delete(orderId) {
        const orders = this.getAll().filter(order => order.orderId !== orderId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
    }
}