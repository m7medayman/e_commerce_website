
import { ProductModel } from "../../../core/models/product_model.js";
import { WishlistModel } from "../../../core/models/wish_model.js";
import { CartModel } from "../../../core/models/cart_model.js";
import { ProductView } from "../view/product_view.js"

export class ProductController {
  constructor() {
    this.view = new ProductView("product-details");
    const params = new URLSearchParams(window.location.search);
    this.id = params.get("id");
    this.addToCart = this.addToCart.bind(this);
    this.toggelProductInWishList = this.toggelProductInWishList.bind(this);

  }

  init() {
    this.view.renderPage();


    const product = ProductModel.getById(this.id);
    let favoriteList = (WishlistModel.getByUserId("user-1")["items"]).map(item => item.productId);
    product.isFavorite = favoriteList.includes(product.productId);
    if (product) {
      this.view.render(product);
    }
    this.view.addToCartEventListner(this.addToCart);
    this.view.togelFavorite(this.toggelProductInWishList);

  }
  addToCart(productCount) {
    CartModel.addItem('user-1', this.id, productCount);
  };
  toggelProductInWishList(isFavorite) {
    if (isFavorite) {
      WishlistModel.addItem("user-1", ProductModel.getById(this.id));
    }
    else {
      WishlistModel.removeItem("user-1", this.id);
    }
  }

}
