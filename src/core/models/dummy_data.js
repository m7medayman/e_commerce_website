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
            },
            {
                name: " bathcorner ", description: "this is discription about the bathcorner ", price: 200,
                detailedImages: [
                    "./assets/images/products/bathcorner1",
                    "./assets/images/products/bathcorner2",
                    "./assets/images/products/bathcorner3"

                ], category: "bathroom", stock: 8, sellerId: seller1.userId, measurement: "10 x 10 x10", rate: 4, numberOfReviews: 10, discount: 10
            },
            {
                name: " bathwaste ", description: "this is discription about the bathwaste ", price: 150,
                detailedImages: [
                    "./assets/images/products/bathwaste1",
                    "./assets/images/products/bathwaste2",
                    "./assets/images/products/bathwaste3"

                ], category: "bathroom", stock: 20, sellerId: seller1.userId, measurement: "10 x 15 x10", rate: 2, numberOfReviews: 10, discount: 10
            },
             {
                name: " bathroom ", description: "this is discription about the bathroom ", price: 3000,
                detailedImages: [
                    "./assets/images/products/bathroom1",
                    "./assets/images/products/bathroom2",
                    "./assets/images/products/bathroom3"

                ], category: "bathroom", stock: 5, sellerId: seller1.userId, measurement: "20 x 15 x10", rate: 2, numberOfReviews: 10, discount: 10
            },
             {
                name: " bedroom ", description: "this is discription about the bedroom ", price: 5000,
                detailedImages: [
                    "./assets/images/products/bedroom1",
                    "./assets/images/products/bedroom2",
                    "./assets/images/products/bedroom3"

                ], category: "bedroom", stock: 6, sellerId: seller1.userId, measurement: "200 x 15 x10", rate: 5, numberOfReviews: 10, discount: 10
            },
             {
                name: " bed ", description: "this is discription about the bed ", price: 150,
                detailedImages: [
                    "./assets/images/products/bed1",
                    "./assets/images/products/bed2",
                    "./assets/images/products/bed3"

                ], category: "bedroom", stock: 4, sellerId: seller1.userId, measurement: "10 x 15 x10", rate: 5, numberOfReviews: 10, discount: 10
            },
             {
                name: " mirror ", description: "this is discription about the mirror ", price: 150,
                detailedImages: [
                    "./assets/images/products/mirror1",
                    "./assets/images/products/mirror2",
                    "./assets/images/products/mirror3"

                ], category: "bedroom", stock: 20, sellerId: seller1.userId, measurement: "10 x 15 x10", rate: 2, numberOfReviews: 10, discount: 10
            },
             {
                name: " waredrobe ", description: "this is discription about the bedroom ", price: 150,
                detailedImages: [
                    "./assets/images/products/waredrob1",
                    "./assets/images/products/waredrob2",
                    "./assets/images/products/waredrob3"

                ], category: "bedroom", stock: 20, sellerId: seller1.userId, measurement: "10 x 15 x10", rate: 2, numberOfReviews: 10, discount: 10
            },

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