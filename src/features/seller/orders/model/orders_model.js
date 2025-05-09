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
    /*
    name
  : 
  "Product 2"
  price
  : 
  20
  productId
  : 
  "9a08e1b3-c339-4b15-b6c5-e35f35397b8d"
  quantity
  : 
  1
  sellerId
  : 
  "seller-1"
  url
  : 
  "./assets/images/test_product_img.png" */
    getBySellerId() {
        const allOrders = OrdersModel.getAll();
        const itemsList = []
        for (const order of allOrders) {
            for (const item of order.items) {
                if (item.sellerId == this.sellerId) {
                    itemsList.push(item);
                }
            }

        }
        return itemsList;


    }
}