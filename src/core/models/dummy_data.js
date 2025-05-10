import { CartModel } from "./cart_model.js"
import { ProductModel } from "./product_model.js";
import { AuthModel } from "./auth_model.js"
export class DummyData {
    static generateDummyData() {
        let admin = AuthModel.signUp({ email: "admin@test.com", password: "123456Ma$", name: "admin name", role: "admin", phone: "01203456789", address: "test admin address" });
        let seller1 = AuthModel.signUp({ email: "seller@test.com", password: "123456Ma$", name: "seller 1", role: "seller", phone: "01203456789", address: "test seller address" });
        let seller2 = AuthModel.signUp({ email: "seller2@test.com", password: "123456Ma$", role: "seller", name: "seller 2", phone: "01203456789", address: "test seller2 address" });
        const prodcts = [
            {
                name: " chair ", description: "this is discription about the chair ", price: 100,
                detailedImages: ["./assets/images/products/p1_1.webp",
                    "./assets/images/products/p1_2.avif",
                    "./assets/images/products/p1_3.avif",
                    "./assets/images/products/p1_4.avif"

                ], category: "living", stock: 10, sellerId: seller1.userId, measurement: "10 x 10 x10", rate: 5, numberOfReviews: 10, discount: 10
            },
            {
                name: " white chair", description: "this is discription about the chair ", price: 200,
                detailedImages: ["./assets/images/products/p2_1.avif",
                    "./assets/images/products/p2_2.avif",


                ], category: "living", stock: 10, sellerId: seller1.userId, measurement: "10 x 10 x10", rate: 3, numberOfReviews: 10, discount: 20
            },
            {
                name: " black table ", description: "this is discription about the black table ", price: 300,
                detailedImages: ["./assets/images/products/p_l_1_1.avif",
                    "./assets/images/products/p_l_1_2.avif",
                    "./assets/images/products/p_l_1_3.webp",


                ], category: "living", stock: 10, sellerId: seller2.userId, measurement: "10 x 10 x10", rate: 4, numberOfReviews: 30, discount: 40
            },
            {
                name: " kitchen capin ", description: "this is discription about the kitchen capin ", price: 700,
                detailedImages: ["./assets/images/products/p_k_1_1.avif",
                    "./assets/images/products/p_k_1_2.avif",
                    "./assets/images/products/p_k_1_3.avif",
                    "./assets/images/products/p_k_1_4.avif",


                ], category: "kitchen", stock: 5, sellerId: seller2.userId, measurement: "100 x 100 x100", rate: 4, numberOfReviews: 30, discount: 30
            },
            {
                name: " kitchen counter ", description: "this is discription about the kitchen counter ", price: 800,
                detailedImages: ["./assets/images/products/p_k_3_1.avif",
                    "./assets/images/products/p_k_3_2.avif",

                ], category: "kitchen", stock: 5, sellerId: seller2.userId, measurement: "100 x 100 x100", rate: 4, numberOfReviews: 30, discount: 30
            }
        ]
        // const userId = "user-1";
        // const userId2 = "user-2";
        // // generate the dummy product data
        // this.generateDummyProductData();
        // // add the dummy cart data
        // ProductModel.getAll().forEach((product, index) => {
        //     const quantity = Math.floor(Math.random() * 5) + 1; // Random quantity between 1 and 5
        //     const productId = product.productId;

        //     CartModel.addItem(userId, productId, quantity);
        //     if (index % 2 === 0) {
        //         CartModel.addItem(userId2, productId, quantity);
        //     }
        // });
        DummyData.generateDummyProductData(prodcts);

    }
    static generateDummyProductData(prodcts) {
        for (const prdoct of prodcts) {
            ProductModel.add({
                name: prdoct.name, description: prdoct.description, price: prdoct.price,
                detailedImages: prdoct.detailedImages,
                category: prdoct.category, stock: prdoct.stock,
                sellerId: prdoct.sellerId,
                measurement: prdoct.measurement,
                discount: prdoct.discount,
                rate: prdoct.rate,
                numberOfReviews: prdoct.numberOfReviews
            })

        }
        // for (let i = 0; i < 10; i++) {
        //     const rate = Math.floor(Math.random() * 5) + 1;
        //     const reviews = Math.floor(Math.random() * 3) + 1;
        //     ProductModel.add({
        //         name: `Product ${i + 1}`,
        //         description: `Description for Product ${i + 1}`,
        //         price: (i + 1) * 10,
        //         detailedImages: ["./assets/images/test_product_img.png", "assets/images/carousalTestIimg.png"], //add your test images here 

        //         category: "Category 2",
        //         stock: 10,
        //         sellerId: "seller-1",
        //         measurement: "10x10x10",
        //         rate: rate,
        //         numberOfReviews: reviews,
        //         discount: Math.floor(Math.random() * 100) // Random discount between 0 and 100
        //     });
        // }
    }
    static clearTheLocalStorage() {
        localStorage.clear();
    }
}