// import { ProductModel } from "../model/product_model.js";
// import { ProductView } from "../view/product_view.js";

export class ProductController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const product = this.model.getProductById(id);
    this.view.render(product);
  }
}
