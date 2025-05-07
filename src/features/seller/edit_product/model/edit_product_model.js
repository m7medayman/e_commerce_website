import { ProductModel } from "../../../../core/models/product_model.js";

export class EditProductModel{
    constructor(productId){
        this.product=ProductModel.getById(productId);
    }
    getProduct(){
        return this.product;
    }
}