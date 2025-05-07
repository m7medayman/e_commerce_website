import { HomeModel } from '../model/home_model.js';
import { HomeView } from '../view/home_view.js';
import { DummyData } from '../../../core/models/dummy_data.js';
import { ProductModel } from '../../../core/models/product_model.js';
import { CartModel } from '../../../core/models/cart_model.js';
import { WishlistModel } from '../../../core/models/wish_model.js'
export class HomeController {
    constructor() {
        this.model = new HomeModel();
        this.view = new HomeView();

    }

    init() {
        // DummyData.clearTheLocalStorage(); // to clear the old data if there is any 
        DummyData.generateDummyProductData(); // that will generate dummy product data and add it to the cart 
        let images = this.model.getImages();
        let products = this.model.getProducts();
        // Get the favorite list once before mapping products
        let favoriteList = (WishlistModel.getByUserId("user-1")["items"]).map(item => item.productId);

        products = products.map(function (product) {
            let f = favoriteList.includes(product.id);
            product.isFavorite = favoriteList.includes(product.id);
            return product;
        });
        console.log(products);
        let threeImageSection = this.model.getThreeImageSection();
        this.view.renderPage();
        this.view.renderCarousel(images);
        this.view.renderNewProducts(products);
        this.view.addEventListenerToProductCard(this.addAddToCartEventListener, this.toggelProductInWishList, this.goToProductPage);
        // this.view.addAddToCartEventListener(this.addAddToCartEventListener);
        // this.view.addWishlistEventListener();
        this.view.renderThreeImageSection(threeImageSection[0], threeImageSection[1], threeImageSection[2]);
        this.view.renderFourIconsSection();
        this.view.renderBigTwoPartBanner("./assets/images/big_panner.png")


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
    setupEventListeners() {
        // Add any event listeners here if needed
    }
}