export class ProductModel {
    constructor() {
      this.products = JSON.parse(localStorage.getItem("products")) || [];
    }
  
    getProductById(id) {
      return this.products.find(product => product.id === id);
    }
  }