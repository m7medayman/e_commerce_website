
import { } from "../../../core/models/cart_model.js"
import { ProductModel } from "../../../core/models/product_model.js";

export class ProductController {
  constructor(view) {
    this.view = view;
  }

  init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const product = ProductModel.getById(id);

    if (product) {
      this.view.render(product);
    }
    this.view.addToCartEventListner(product.productId);

  }

}
