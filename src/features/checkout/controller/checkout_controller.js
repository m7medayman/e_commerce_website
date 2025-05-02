import CheckoutModel from '../model/checkout_model.js';
import CheckoutView from '../view/checkout_view.js';

class CheckoutController {
    constructor() {
        this.model = new CheckoutModel();
        this.view = new CheckoutView();
        this.view.render(this.model, () => this.attachQuantityListeners());
        this.setupStaticEventListeners();
    }

    attachQuantityListeners() {
        const decreaseButtons = document.querySelectorAll('.decrease');
        const increaseButtons = document.querySelectorAll('.increase');

        decreaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.getAttribute('data-id');
                this.model.updateQuantity(itemId, -1);
                this.view.updateOrderSummary(this.model, () => this.attachQuantityListeners());
            });
        });

        increaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.getAttribute('data-id');
                this.model.updateQuantity(itemId, 1);
                this.view.updateOrderSummary(this.model, () => this.attachQuantityListeners());
            });
        });
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
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            const street = document.getElementById('street');
            const country = document.getElementById('country');
            const city = document.getElementById('city');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            let isValid = true;

            if (!firstName.value.trim()) {
                this.view.showValidationError(firstName, 'First name is required.');
                isValid = false;
            } else {
                this.view.clearValidationError(firstName);
            }

            if (!lastName.value.trim()) {
                this.view.showValidationError(lastName, 'Last name is required.');
                isValid = false;
            } else {
                this.view.clearValidationError(lastName);
            }

            if (!phone.value.trim()) {
                this.view.showValidationError(phone, 'Phone number is required.');
                isValid = false;
            } else {
                this.view.clearValidationError(phone);
            }

            if (!email.value.trim() || !emailRegex.test(email.value)) {
                this.view.showValidationError(email, 'A valid email is required.');
                isValid = false;
            } else {
                this.view.clearValidationError(email);
            }

            if (!street.value.trim()) {
                this.view.showValidationError(street, 'Street address is required.');
                isValid = false;
            } else {
                this.view.clearValidationError(street);
            }

            if (!country.value) {
                this.view.showValidationError(country, 'Country is required.');
                isValid = false;
            } else {
                this.view.clearValidationError(country);
            }

            if (!city.value.trim()) {
                this.view.showValidationError(city, 'Town/City is required.');
                isValid = false;
            } else {
                this.view.clearValidationError(city);
            }

            if (isValid) {
                this.model.customer = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    phone: phone.value,
                    email: email.value,
                    shippingAddress: {
                        street: street.value,
                        country: country.value,
                        city: city.value,
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