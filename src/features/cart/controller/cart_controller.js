import { CartModel } from '../model/cart_model.js';
import { CartView } from '../view/cart_view.js';
export class CartController {
    constructor() {
        this.model = new CartModel();
        this.view = new CartView();
        
    }

    init() {
        this.view.renderPage();
       this.view.renderProgress();
    }

    setupEventListeners() {
        // Add any event listeners here if needed
    }
}