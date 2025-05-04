import { CartDataModel } from '../model/cart_data_model.js';
import { CartView } from '../view/cart_view.js';
import { DummyData } from '../../../core/models/dummy_data.js';
export class CartController {
    constructor() {
        this.model = new CartDataModel();
        this.view = new CartView();
    }
 
    init() {
        DummyData.clearTheLocalStorage();
        DummyData.generateDummyCartData();
        this.view.renderPage();
        this.view.renderProgress();
        this.renderCart();
        this.addEventListeners();
        this.renderSummary();
    }
    renderCart() {
        const items = this.model.getCartItems();
        this.view.renderCart(items);
    }
    renderSummary() {
        this.view.renderSummary(this.model.getSubtotal(), this.model.getShippingOption());
    }

    addEventListeners() {
        document.getElementById('cart-items').addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            const index = parseInt(e.target.dataset.index);

            if (action === 'increase') {
                this.model.updateQuantity(index, 1);
                this.renderCart();
                this.renderSummary();
            } else if (action === 'decrease') {
                this.model.updateQuantity(index, -1);
                this.renderCart();
                this.renderSummary();
            } else if (action === 'remove') {
                this.model.removeItem(index);
                this.renderCart();
                this.renderSummary();
            }
        });

        document.getElementById('cart-summary').addEventListener('change', (e) => {
            if (e.target.name === 'shipping') {
                const option = e.target.value;
                this.model.setShipping(option);
                this.renderSummary(); 
            }
        });

        document.getElementById('cart-summary').addEventListener('click', (e) => {
            if (e.target.matches('button.btn-primary')) {
                this.handleCheckout();
            }
        });
    }
    handleCheckout() {
        this.view.renderProgress(2);
        const checkoutObj = this.model.getCheckoutData();
        localStorage.setItem('checkoutData', JSON.stringify(checkoutObj)); 
        // document.getElementById('shopping').style.display = 'none';
        window.location.href = 'checkout.html';
    }

}
