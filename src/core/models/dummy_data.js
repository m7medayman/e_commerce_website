import { CartModel } from "./cart_model.js"
import { ProductModel } from "./product_model.js";
export class DummyData {
    static generateDummyCartData() {
        const userId = "user-1";
        const userId2 = "user-2";
        // generate the dummy product data
        this.generateDummyProductData();
        // add the dummy cart data
        ProductModel.getAll().forEach((product, index) => {
            const quantity = Math.floor(Math.random() * 5) + 1; // Random quantity between 1 and 5
            const productId = product.productId;

            CartModel.addItem(userId, productId, quantity);
            if (index % 2 === 0) {
                CartModel.addItem(userId2, productId, quantity);
            }
        });

    }
    static generateDummyProductData() {
        for (let i = 0; i < 10; i++) {
            const rate = Math.floor(Math.random() * 5) + 1;
            const reviews = Math.floor(Math.random() * 3) + 1;
            ProductModel.add({
                name: `Product ${i + 1}`,
                description: `Description for Product ${i + 1}`,
                price: (i + 1) * 10,
                detailedImages: ["./assets/images/test_product_img.png", "assets/images/carousalTestIimg.png"], //add your test images here 
                category: "Category 1",
                stock: 10,
                sellerId: "seller-1",
                measuarment: "10x10x10",
                rate: rate,
                numberOfReviews: reviews,
            });
        }
    }
    static clearTheLocalStorage() {
        localStorage.clear();
    }
}