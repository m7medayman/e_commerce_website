import { CheckoutModel } from '../model/checkout_model.js';
import CheckoutView from '../view/checkout_view.js';
import { AuthModel } from '../../../core/models/auth_model.js';
import { CartModel } from "../../../core/models/cart_model.js";
import { ProductModel } from "../../../core/models/product_model.js";
class CheckoutController {
    constructor() {
        // Check if user is signed in
        if (!AuthModel.isSignedIn()) {
            window.location.href = 'login.html';
            return;
        }

        this.model = new CheckoutModel();
        this.view = new CheckoutView();
        this.view.render(this.model);

        this.setupStaticEventListeners();
    }
    setupStaticEventListeners() {
        // Coupon application
        document.getElementById('applyCouponCheckout').addEventListener('click', () => {
            const couponCode = document.getElementById('couponCodeCheckout').value.trim();
            this.model.applyCoupon(couponCode);
            this.view.updateOrderSummary(this.model, () => this.attachQuantityListeners());
        });
        // Form submission
        document.getElementById('placeOrderBtnCheckout').addEventListener('click', () => {
            const fields = [
                { element: document.getElementById('firstName'), rule: val => val.trim(), message: 'First name is required.' },
                { element: document.getElementById('lastName'), rule: val => val.trim(), message: 'Last name is required.' },
                { element: document.getElementById('phone'), rule: val => val.trim(), message: 'Phone number is required.' },
                { element: document.getElementById('email'), rule: val => val.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), message: 'A valid email is required.' },
                { element: document.getElementById('street'), rule: val => val.trim(), message: 'Street address is required.' },
                { element: document.getElementById('country'), rule: val => val, message: 'Country is required.' },
                { element: document.getElementById('city'), rule: val => val.trim(), message: 'Town/City is required.' },
            ];

            let isValid = true;

            fields.forEach(field => {
                if (!field.rule(field.element.value)) {
                    this.view.showValidationError(field.element, field.message);
                    isValid = false;
                } else {
                    this.view.clearValidationError(field.element);
                }
            });

            if (isValid) {
                this.model.customer = {
                    firstName: fields[0].element.value,
                    lastName: fields[1].element.value,
                    phone: fields[2].element.value,
                    email: fields[3].element.value,
                    shippingAddress: {
                        street: fields[4].element.value,
                        country: fields[5].element.value,
                        city: fields[6].element.value,
                        state: document.getElementById('state').value,
                        zip: document.getElementById('zip').value,
                    },

                };
                const order = this.model.saveOrderWithOrderModel();
                for (let item of order.items) {
                    let itemInStorage = ProductModel.getById(item.productId);

                    if (itemInStorage.stock < item.quantity) {
                        alert(`there is not enough stock of product ${itemInStorage.name} `);
                        return;
                    }
                    else {
                        ProductModel.update(itemInStorage.productId, { stock: itemInStorage.stock - item.quantity })
                    }
                }
                CartModel.clear(AuthModel.getUser().userId);
                window.location.href = 'order_confirmation.html';
            }
        });
    }
}

new CheckoutController();