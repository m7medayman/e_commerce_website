export class SellerAnalyticsModel {
    static STORAGE_KEY = 'sellerAnalytics';

    static getAll() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    }

    static getBySellerId(sellerId) {
        return this.getAll().find(analytics => analytics.sellerId === sellerId) || this.initializeAnalytics(sellerId);
    }

    static initializeAnalytics(sellerId) {
        return {
            sellerId,
            totalSales: 0,
            orderCount: 0,
            productsSold: [],
            timePeriod: 'monthly',
            updatedAt: new Date().toISOString()
        };
    }

    static update(sellerId, order) {
        const analyticsList = this.getAll();
        let analytics = this.getBySellerId(sellerId);

        analytics.totalSales += order.totalAmount;
        analytics.orderCount += 1;
        order.items.forEach(item => {
            const existingProduct = analytics.productsSold.find(p => p.productId === item.productId);
            if (existingProduct) {
                existingProduct.quantitySold += item.quantity;
            } else {
                analytics.productsSold.push({ productId: item.productId, quantitySold: item.quantity });
            }
        });
        analytics.updatedAt = new Date().toISOString();

        const index = analyticsList.findIndex(a => a.sellerId === sellerId);
        if (index >= 0) {
            analyticsList[index] = analytics;
        } else {
            analyticsList.push(analytics);
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(analyticsList));
        return analytics;
    }
}
