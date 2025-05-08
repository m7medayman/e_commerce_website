import { ShopView } from "../view/shop_view.js";
import { ShopModel } from "../model/shop_model.js";
import { ProductModel } from '../../../core/models/product_model.js';
import { CartModel } from '../../../core/models/cart_model.js';
import { WishlistModel } from '../../../core/models/wish_model.js'
export class ShopController {
    constructor() {
        this.model = new ShopModel();
        this.view = new ShopView();

    }
    init() {
        let products = this.model.getProducts();
        // Get the favorite list once before mapping products
        let favoriteList = (WishlistModel.getByUserId("user-1")["items"]).map(item => item.productId);

        products = products.map(function (product) {
            let f = favoriteList.includes(product.id);
            product.isFavorite = favoriteList.includes(product.id);
            return product;
        });
        console.log(products);
        this.view.renderPage();
        this.view.renderNewProducts(products);
        this.view.addEventListenerToProductCard(this.addAddToCartEventListener, this.toggelProductInWishList, this.goToProductPage);



    }
    addAddToCartEventListener(id) {
        const userId = "user-1";
        CartModel.addItem(userId, id, 1);
        console.log("Add to cart clicked for product ID:", id);

    }
    toggelProductInWishList(produtId, isFavorite) {
        if (isFavorite) {
            WishlistModel.addItem("user-1", ProductModel.getById(produtId));
        }
        else {
            WishlistModel.removeItem("user-1", produtId);
        }
    }
    goToProductPage(id) {
        window.location.href = `./product_details.html?id=${id}`;
    }
}