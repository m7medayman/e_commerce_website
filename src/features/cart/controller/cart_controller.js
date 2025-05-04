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
        this.setupDrawer();
        this.view.renderProgress();
        this.renderCart();
        this.addEventListeners();
        this.renderSummary();

        // this.view.renderCoupon();
        // this.handleCoupon();

    }


    setupDrawer() {
        const bagIcon = document.querySelector('.fa-bag-shopping');
        const drawer = document.getElementById('cart-drawer');
        const closeBtn = document.getElementById('close-cart');
    
        bagIcon.addEventListener('click', () => {
            drawer.classList.add('show');
            this.view.renderDrawerCart(this.model);
        });
    
        closeBtn.addEventListener('click', () => {
            drawer.classList.remove('show');
        });
    
        document.getElementById("go-to-checkout").addEventListener("click", () => {
            window.location.href = "checkout.html";
        });
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