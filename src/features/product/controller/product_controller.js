

import {ProductModel} from "../../../core/models/product_model.js";   

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
    } else {
      this.view.renderError("Product not fلهفound");
    }
    // // Dummy Data بدلاً من استرجاع المنتج من الـ localStorage
    // const dummyProduct = {
    //   id: 1,
    //   name: "Sample Product",
    //   img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Lion_d%27Afrique.jpg/1099px-Lion_d%27Afrique.jpg",
    //   description: "This is a description of the sample product.",
    //   price: "$99.99",
    //   discount: "$79.99",
    //   measurements: "10 x 5 x 2 cm",
    // };

    // // مباشرة تمرير الـ dummyProduct للـ view
    // this.view.render(dummyProduct);
  }
}
