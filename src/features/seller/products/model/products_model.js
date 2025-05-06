import { ProductModel } from "../../../../core/models/product_model.js";
export class ProductsModel{
    constructor(){
        this.allProducts = ProductModel.getAll();
    }
     getBySellerId(sellerId) {
        return this.allProducts.filter(product => product.sellerId === sellerId);
    }
}