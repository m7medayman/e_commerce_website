export class OrdersModel {
    static STORAGE_KEY = 'orders'; // مفتاح لتخزين الـ orders في localStorage

    constructor(sellerId) {
        this.sellerId = sellerId; // تخزين sellerId ديناميكيًا
    }

    // جلب كل الـ orders من localStorage
    static getAll() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    }

    // جلب الـ orders المؤكدة لـ seller معين
    getBySellerId() {
        return OrdersModel.getAll().filter(
            order => order.sellerId === this.sellerId && order.status === 'confirmed'
        );
    }
}