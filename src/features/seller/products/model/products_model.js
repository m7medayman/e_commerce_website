import { AuthModel } from "../../../../core/models/auth_model.js";
import { ProductModel } from "../../../../core/models/product_model.js";
export class ProductsModel {
    constructor() {
        this.allProducts = ProductModel.getAll();
<<<<<<< HEAD
        this.sellerId = 'seller-1';
=======
        this.sellerId=localStorage.getItem(AuthModel.STORAGE_KEY);
>>>>>>> seller
    }
    getBySellerId() {
        return this.allProducts.filter(product => product.sellerId === this.sellerId);
    }
}