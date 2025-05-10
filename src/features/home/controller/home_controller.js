import { HomeModel } from '../model/home_model.js';
import { HomeView } from '../view/home_view.js';
import { DummyData } from '../../../core/models/dummy_data.js';
import { ProductModel } from '../../../core/models/product_model.js';
import { CartModel } from '../../../core/models/cart_model.js';
import { WishlistModel } from '../../../core/models/wish_model.js'
import { AuthModel } from "../../../core/models/auth_model.js"
import { AuthPopupController } from "../../../core/common/auth_checker/auth_checker_controller.js"


export class HomeController {
    constructor() {
        this.model = new HomeModel();
        this.view = new HomeView();

    }

    init() {
        this.auth = AuthModel.getUser();
        this.isLoggedIn = !(this.auth == null);
        console.log(this.isLoggedIn);
        // DummyData.clearTheLocalStorage(); // to clear the old data if there is any 
        try {
            DummyData.generateDummyData();
        } catch (error) {
            console.log("email is exsist");
        }// that will generate dummy product data and add it to the cart 
        let images = this.model.getImages();
        let products = this.model.getProducts();
        // Get the favorite list once before mapping products

        if (this.isLoggedIn) {
            let favoriteList = (WishlistModel.getByUserId(this.auth.userId)["items"]).map(item => item.productId);
            products = products.map(product => {
                product.isFavorite = favoriteList.includes(product.id);
                return product;
            });
        }
        console.log(products);
        let threeImageSection = this.model.getThreeImageSection();
        this.view.renderPage();
        this.view.renderCarousel(images);
        this.view.renderNewProducts(products);
        this.view.addEventListenerToProductCard(this.addAddToCartEventListener.bind(this), this.toggelProductInWishList.bind(this), this.goToProductPage);
        // this.view.addAddToCartEventListener(this.addAddToCartEventListener);
        // this.view.addWishlistEventListener();
        this.view.renderThreeImageSection(threeImageSection[0], threeImageSection[1], threeImageSection[2]);
        this.view.renderFourIconsSection();
        this.view.renderBigTwoPartBanner("./assets/images/big_panner.png")


    }
    addAddToCartEventListener(id) {
        if (!this.isLoggedIn) {
            AuthPopupController.show("to add product");
            return false;
        }

        const userId = this.auth.userId;
        CartModel.addItem(userId, id, 1);
        console.log("Add to cart clicked for product ID:", id);
        return true;

    }
    toggelProductInWishList(produtId, isFavorite) {
        if (!this.isLoggedIn) {
            AuthPopupController.show("to add product");
            return false;
        }

        const userId = this.auth.userId;
        if (isFavorite) {
            WishlistModel.addItem(userId, ProductModel.getById(produtId));
        }
        else {
            WishlistModel.removeItem(userId, produtId);
        }
        return true;

    }
    goToProductPage(id) {
        window.location.href = `./product_details.html?id=${id}`;
    }

}