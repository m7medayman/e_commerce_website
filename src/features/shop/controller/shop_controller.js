import { ShopView } from "../view/shop_view.js";
import { ShopModel } from "../model/shop_model.js";
import { ProductModel } from '../../../core/models/product_model.js';
import { CartModel } from '../../../core/models/cart_model.js';
import { WishlistModel } from '../../../core/models/wish_model.js'
import { AuthPopupController } from "../../../core/common/auth_checker/auth_checker_controller.js"
import { AuthModel } from "../../../core/models/auth_model.js"
export class ShopController {
    constructor() {
        this.model = new ShopModel();
        this.view = new ShopView();
        this.filters = {
            category: 'all',
            priceRange: 'all'
        };
    }

    init() {
        this.auth = AuthModel.getUser();
        this.isLoggedIn = !(this.auth == null);
        console.log(this.isLoggedIn);
        // Get categories for filter dropdown
        const categories = this.model.getCategories();

        // Render the page with filter options
        this.view.renderPage(categories);

        // Load initial products
        this.loadProducts();

        // Add filter event listeners
        this.view.addFilterEventListeners(this.handleFilter.bind(this));



    }

    handleFilter(filterType, value) {
        // Update filter state
        this.filters[filterType] = value;

        // Reload products with new filters
        this.loadProducts();

    }

    loadProducts() {
        // Get filtered products
        let products = this.model.getProducts(this.filters);

        // Apply wishlist status
        if (this.isLoggedIn) {
            let favoriteList = (WishlistModel.getByUserId(this.auth.userId)["items"]).map(item => item.productId);
            products = products.map(product => {
                product.isFavorite = favoriteList.includes(product.id);
                return product;
            });
        }


        // Render products
        this.view.renderNewProducts(products);

        // Re-add event listeners to new product cards
        this.view.addEventListenerToProductCard(
            this.addAddToCartEventListener.bind(this),
            this.toggleProductInWishList.bind(this),
            this.goToProductPage.bind(this)
        );

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
    toggleProductInWishList(produtId, isFavorite) {
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