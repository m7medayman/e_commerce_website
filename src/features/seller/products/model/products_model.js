import { ProductModel } from "../../../../core/models/product_model.js";
export class ProductsModel{
    constructor(){
        this.allProducts = ProductModel.getAll();
        this.sellerId='seller-2';
    }
     getBySellerId() {
        return this.allProducts.filter(product => product.sellerId === this.sellerId);
    }
}