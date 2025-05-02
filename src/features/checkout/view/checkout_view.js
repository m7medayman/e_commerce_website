class CheckoutView {
    constructor() {
        this.container = document.querySelector('.container');
        this.styles = document.createElement('link');
        this.styles.rel = 'stylesheet';
        this.styles.href = '../styles/pages/checkout.css';
        document.head.appendChild(this.styles);
        this.orderSummaryContainer = null;
    }

    // Initial full render
    render(model, attachListenersCallback) {
        const html = `
            <div class="my-5">
                <div id="mobileBackCheckout" class="mb-4 d-block d-md-none">
                    <a href="#" class="text-dark">← back</a>
                </div>
                <div id="checkoutStepperCheckout" class="d-flex justify-content-center mb-4">
                    <div id="step1Checkout" class="d-flex align-items-center mx-2">
                        <div id="stepNumber1Checkout" class="rounded-circle text-white d-flex justify-content-center align-items-center me-2">1</div>
                        <span>Shopping cart</span>
                    </div>
                    <div id="step2Checkout" class="d-flex align-items-center mx-2">
                        <div id="stepNumber2Checkout" class="rounded-circle text-white d-flex justify-content-center align-items-center me-2 active">2</div>
                        <span>Checkout details</span>
                    </div>
                    <div id="step3Checkout" class="d-flex align-items-center mx-2">
                        <div id="stepNumber3Checkout" class="rounded-circle text-white d-flex justify-content-center align-items-center me-2">3</div>
                        <span>Order complete</span>
                    </div>
                </div>
                <h2 id="checkoutTitle" class="text-center position-relative mb-4 d-block d-md-none">Check Out</h2>
                <div class="row">
                    <div class="col-md-8">
                        <div id="contactInfoCheckout" class="card p-4 mb-4">
                            <h5 id="contactInfoTitleCheckout" class="section-title fw-bold mb-3">CONTACT INFORMATION</h5>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <input type="text" class="form-control" id="firstName" placeholder="First name" value="${model.customer.firstName}">
                                    <div class="invalid-feedback">First name is required.</div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <input type="text" class="form-control" id="lastName" placeholder="Last name" value="${model.customer.lastName}">
                                    <div class="invalid-feedback">Last name is required.</div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="phone" placeholder="Phone number" value="${model.customer.phone}">
                                <div class="invalid-feedback">Phone number is required.</div>
                            </div>
                            <div class="mb-3">
                                <input type="email" class="form-control" id="email" placeholder="Your Email" value="${model.customer.email}">
                                <div class="invalid-feedback">A valid email is required.</div>
                            </div>
                        </div>
                        <div id="shippingAddressCheckout" class="card p-4 mb-4">
                            <h5 id="shippingAddressTitleCheckout" class="section-title fw-bold mb-3">SHIPPING ADDRESS</h5>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="street" placeholder="Street Address *" value="${model.customer.shippingAddress.street}">
                                <div class="invalid-feedback">Street address is required.</div>
                            </div>
                            <div class="mb-3">
                                <select class="form-select" id="country">
                                    <option value="">Country *</option>
                                    <option value="USA" ${model.customer.shippingAddress.country === 'USA' ? 'selected' : ''}>USA</option>
                                    <option value="Canada" ${model.customer.shippingAddress.country === 'Canada' ? 'selected' : ''}>Canada</option>
                                </select>
                                <div class="invalid-feedback">Country is required.</div>
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="city" placeholder="Town / City *" value="${model.customer.shippingAddress.city}">
                                <div class="invalid-feedback">Town/City is required.</div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <input type="text" class="form-control" id="state" placeholder="State" value="${model.customer.shippingAddress.state}">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <input type="text" class="form-control" id="zip" placeholder="Zip Code" value="${model.customer.shippingAddress.zip}">
                                </div>
                            </div>
                        </div>
                        <div id="paymentMethodCheckout" class="card p-4 mb-4">
                            <h5 id="paymentMethodTitleCheckout" class="section-title fw-bold mb-3">PAYMENT METHOD</h5>
                            <div id="formCheckCodCheckout" class="form-check mb-3">
                                <input id="codInputCheckout" class="form-check-input" type="radio" name="paymentMethod" id="cod" checked disabled>
                                <label id="codLabelCheckout" class="form-check-label" for="cod">Cash on Delivery (COD)</label>
                            </div>
                        </div>
                    </div>
                    <div id="orderSummaryCheckout" class="col-md-4 mt-4 mt-md-0">
                        <div id="orderSummaryCardCheckout" class="card p-4">
                            <h5 id="orderSummaryTitleCheckout" class="section-title fw-bold mb-3">ORDER SUMMARY</h5>
                            <div id="orderItemsContainerCheckout"></div>
                            <div id="couponInputCheckout" class="d-flex mb-3">
                                <input id="couponCodeCheckout" type="text" class="form-control me-2" placeholder="JENKAMW">
                                <button id="applyCouponCheckout" class="btn btn-dark">APPLY</button>
                            </div>
                            <p id="couponAppliedCheckout" class="text-success mb-3">$${model.couponDiscount.toFixed(2)} (REMOVE)</p>
                            <div id="totalSectionCheckout" class="fw-bold">
                                <div id="shippingRowCheckout" class="d-flex justify-content-between">
                                    <span id="shippingLabelCheckout">SHIPPING</span>
                                    <span id="shippingCostCheckout">Free</span>
                                </div>
                                <div id="subtotalRowCheckout" class="d-flex justify-content-between">
                                    <span id="subtotalLabelCheckout">SUBTOTAL</span>
                                    <span id="subtotalCheckout"></span>
                                </div>
                                <div id="totalRowCheckout" class="d-flex justify-content-between">
                                    <span id="totalLabelCheckout">TOTAL</span>
                                    <span id="totalCheckout"></span>
                                </div>
                            </div>
                            <button id="placeOrderBtnCheckout" class="btn btn-dark w-100 mt-3">PLACE ORDER</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.container.innerHTML = html;
        this.orderSummaryContainer = document.getElementById('orderItemsContainerCheckout');
        this.updateOrderSummary(model, attachListenersCallback);
    }

    // Update only the order summary section
    updateOrderSummary(model, attachListenersCallback) {
        const html = `
            ${model.items.map(item => `
                <div id="orderItem${item.id}Checkout" class="d-flex align-items-center mb-3">
                    <img id="itemImage${item.id}Checkout" src="${item.img}" alt="${item.name}" class="me-3">
                    <div id="itemDetails${item.id}Checkout" class="flex-grow-1">
                        <p id="itemName${item.id}Checkout" class="mb-1">${item.name}</p>
                        <div id="quantityControls${item.id}Checkout" class="d-flex align-items-center">
                            <button id="decreaseButton${item.id}Checkout" class="btn btn-sm btn-outline-secondary decrease" data-id="${item.id}">-</button>
                            <input id="quantityInput${item.id}Checkout" type="text" value="${item.quantity}" readonly class="form-control w-25 mx-2 text-center quantity">
                            <button id="increaseButton${item.id}Checkout" class="btn btn-sm btn-outline-secondary increase" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <span id="itemPrice${item.id}Checkout" class="ms-auto item-price">$${item.price.toFixed(2)}</span>
                </div>
            `).join('')}
        `;
        this.orderSummaryContainer.innerHTML = html;

        // Update totals
        document.getElementById('subtotalCheckout').textContent = `$${model.calculateSubtotal().toFixed(2)}`;
        document.getElementById('totalCheckout').textContent = `$${model.calculateTotal().toFixed(2)}`;
        document.getElementById('couponAppliedCheckout').textContent = `$${model.couponDiscount.toFixed(2)} (REMOVE)`;

        // Reattach event listeners
        if (attachListenersCallback) {
            attachListenersCallback();
        }
    }

    showValidationError(element, message) {
        element.classList.add('is-invalid');
        const feedback = element.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = message;
        }
    }

    clearValidationError(element) {
        element.classList.remove('is-invalid');
        const feedback = element.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = '';
        }
    }
}

export default CheckoutView;