export class OrdersModel {
    constructor() {
        this.allOrders = [
            {
                orderId: "order-1",
                sellerId: "seller-2",
                productImage: "https://th.bing.com/th?id=OIF.2bLeEaVs%2fQ0aUJKngjZheQ&rs=1&pid=ImgDetMain",
                productName: "Red Tape Shoes for Men",
                price: "$59.99",
                deliveryTime: "3-5 Days"
            },
            {
                orderId: "order-2",
                sellerId: "seller-2",
                productImage: "https://www.cultfurniture.com/cdn/shop/files/CF_2025_MAY_TRADE_NAV_BANNER_DINING_CHAIRS.webp?v=1746198484&width=1060",
                productName: "Fasttrack FS1 Pro Smartwatch",
                price: "$89.99",
                deliveryTime: "2-4 Days"
            },
            {
                orderId: "order-3",
                sellerId: "seller-2",
                productImage: "https://th.bing.com/th/id/OIP.1rJ5wBHv-fcXyzyxjbnr7AHaJ3?rs=1&pid=ImgDetMain",
                productName: "Larvia Fashion Men's Shirt",
                price: "$29.99",
                deliveryTime: "5-7 Days"
            }
        ];
        this.sellerId = 'seller-2';
    }

    getBySellerId() {
        return this.allOrders.filter(order => order.sellerId === this.sellerId);
    }
}