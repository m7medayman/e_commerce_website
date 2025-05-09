
import { ProductModel } from "../../../core/models/product_model.js";
import { WishlistModel } from "../../../core/models/wish_model.js";
import { CartModel } from "../../../core/models/cart_model.js";
import { ProductView } from "../view/product_view.js"
import { AuthModel } from "../../../core/models/auth_model.js"
import { AuthPopupController } from "../../../core/common/auth_checker/auth_checker_controller.js"

export class ProductController {
  constructor() {
    this.view = new ProductView("product-details");
    const params = new URLSearchParams(window.location.search);
    this.id = params.get("id");
    this.addToCart = this.addToCart.bind(this);
    this.toggelProductInWishList = this.toggelProductInWishList.bind(this);

  }

  init() {
    this.auth = AuthModel.getUser();
    this.isLoggedIn = !(this.auth == null);
    console.log(this.isLoggedIn);
    this.view.renderPage();


    const product = ProductModel.getById(this.id);
    let favoriteList = [];
    if (this.isLoggedIn) {
      favoriteList = (WishlistModel.getByUserId(this.auth.userId)["items"]).map(item => item.productId);

    }
    product.isFavorite = favoriteList.includes(product.productId);
    if (product) {
      this.view.render(product);
    }
    this.view.addToCartEventListner(this.addToCart.bind(this));
    this.view.togelFavorite(this.toggelProductInWishList.bind(this));

  }
  addToCart(productCount) {
    if (!this.isLoggedIn) {
      AuthPopupController.show("to add product");
      return;
    }

    const userId = this.auth.userId;
    CartModel.addItem(userId, this.id, productCount);
  };
  toggelProductInWishList(isFavorite) {
    if (!this.isLoggedIn) {
      AuthPopupController.show("to add product");
      return;
    }

    const userId = this.auth.userId;
    if (isFavorite) {
      WishlistModel.addItem(userId, ProductModel.getById(this.id));
    }
    else {
      WishlistModel.removeItem(userId, this.id);
    }
  }

}
