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

        // this.view.renderCoupon();
        // this.handleCoupon();

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
        document.getElementById('shopping').style.display = 'none';
        window.location.href = 'checkout.html';
    }

    getItems() {
        return this.model.getCartItems();
    }

    getShippingOptions() {
        return this.model.shipping;
    }

    getSelectedShipping() {
        return this.model.selectedShipping;
    }

    // New methods to expose subtotal, shipping cost, and total
    getSubtotal() {
        return this.model.getSubtotal();
    }

    getShippingCost() {
        return this.model.getShippingCost();
    }

    getTotal() {
        return this.model.getTotal();
    }
    
    // handleCoupon() {
    //     document.getElementById('apply-coupon').addEventListener('click', (e) => {
    //         const code = document.getElementById('coupon-code-input').value.trim().toUpperCase();
    //         const isValid = this.model.setCoupon(code);

    //         const message = document.getElementById('coupon-message');
    //         if (isValid) {
    //             message.textContent = `Coupon "${code}" applied successfully!`;
    //             message.classList.remove('text-danger');
    //             message.classList.add('text-success');
    //         } else {
    //             message.textContent = `Invalid coupon code.`;
    //             message.classList.remove('text-success');
    //             message.classList.add('text-danger');
    //         }

    //         this.renderSummary();
    //     });
    // }

}
