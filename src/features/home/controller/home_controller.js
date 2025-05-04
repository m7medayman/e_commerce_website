import { HomeModel } from '../model/home_model.js';
import { HomeView } from '../view/home_view.js';
import { DummyData } from '../../../core/models/dummy_data.js';
import { CartController } from '../../cart/controller/cart_controller.js';
export class HomeController {
    constructor() {
        this.model = new HomeModel();
        this.view = new HomeView();
         this.cart = new CartController();
    }

    init() {
        DummyData.clearTheLocalStorage(); // to clear the old data if there is any 
        DummyData.generateDummyCartData(); // that will generate dummy product data and add it to the cart 
        let images = this.model.getImages();
        this.view.renderPage();
        this.view.renderCarousel(images);
        this.cart.setupDrawer();
        this.cart.addEventToCart();

    }

    setupEventListeners() {
        // Add any event listeners here if needed
    }
}