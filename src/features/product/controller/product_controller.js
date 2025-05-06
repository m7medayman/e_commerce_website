

import {ProductModel} from "../../../core/models/product_model.js";   

export class ProductController {
  constructor(view) {
    this.view = view;
  }

  init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const product = ProductModel.getById(id); 

    // if (product) {
    //   this.view.render(product);
    // } 
    // Dummy Data بدلاً من استرجاع المنتج من الـ localStorage
    const dummyProduct = {
      id: 1,
      name: "Sample Product",
      img: "https://media.istockphoto.com/id/1415799772/photo/home-interior-with-vintage-furniture.jpg?s=612x612&w=0&k=20&c=E5aUyAFo5_xjHcdk0nEZGVDipOkYEtyXQmJBskUbqo8=",
      description: "This is a description of the sample product.",
      price: "$99.99",
      discount: "$79.99",
      measurements: "10 x 5 x 2 cm",
      detailedImages: [
        "https://media.istockphoto.com/id/1415799772/photo/home-interior-with-vintage-furniture.jpg?s=612x612&w=0&k=20&c=E5aUyAFo5_xjHcdk0nEZGVDipOkYEtyXQmJBskUbqo8=",
        "https://kianegypt.com/cdn/shop/files/Kian_Furniture_-_Cover.jpg?v=1691510239",
        "https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129805.jpg",
        
      ],
    };

    this.view.render(dummyProduct);
  }
}
