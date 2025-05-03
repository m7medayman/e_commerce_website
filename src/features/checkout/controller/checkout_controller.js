import CheckoutModel from '../model/checkout_model.js';
import CheckoutView from '../view/checkout_view.js';
import {CartController} from '../../cart/controller/cart_controller.js';
class CheckoutController {
    constructor() {
         const cartController = new CartController();
        // console.log('cartController:', cartController);
        // console.log('cartController.getItems:', cartController.getItems);
        const cartData = {
            items: cartController.getItems(),
            shipping: cartController.getShippingOptions(),
            selectedShipping: cartController.getSelectedShipping(),
            subtotal: cartController.getSubtotal(),
            shippingCost: cartController.getShippingCost(),
            total: cartController.getTotal()
        };
        console.log('cartData:', cartData); 

        this.model = new CheckoutModel(cartData);
        this.view = new CheckoutView();

      
        this.view.render(this.model, () => this.attachQuantityListeners());
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
                const order = this.model.saveOrder();
                window.location.href = 'order_confirmation.html';
            }
        });
    }
}

new CheckoutController();