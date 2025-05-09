import { ShopView } from "../view/shop_view.js";
import { ShopModel } from "../model/shop_model.js";
import { ProductModel } from '../../../core/models/product_model.js';
import { CartModel } from '../../../core/models/cart_model.js';
import { WishlistModel } from '../../../core/models/wish_model.js'
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
        // Get categories for filter dropdown
        const categories = this.model.getCategories();

        // Render the page with filter options
        this.view.renderPage(categories);

        // Load initial products
        this.loadProducts();

        // Add filter event listeners
        this.view.addFilterEventListeners(this.handleFilter.bind(this));

        // Add product card event listeners
        this.view.addEventListenerToProductCard(
            this.addAddToCartEventListener,
            this.toggelProductInWishList,
            this.goToProductPage
        );
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
        let favoriteList = (WishlistModel.getByUserId("user-1")["items"]).map(item => item.productId);
        products = products.map(product => {
            product.isFavorite = favoriteList.includes(product.id);
            return product;
        });

        // Render products
        this.view.renderNewProducts(products);

        // Re-add event listeners to new product cards
        this.view.addEventListenerToProductCard(
            this.addAddToCartEventListener,
            this.toggelProductInWishList,
            this.goToProductPage
        );
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