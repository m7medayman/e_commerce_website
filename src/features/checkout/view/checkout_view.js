import { ProgressBar } from '../../cart/view/components/progress_bar.js'
class CheckoutView {
    constructor() {
        this.container = document.querySelector('.container');
        this.styles = document.createElement('link');
        this.styles.rel = 'stylesheet';
        this.styles.href = '../styles/pages/checkout.css';
        document.head.appendChild(this.styles);
        this.orderSummaryContainer = null;
        this.progressBar = new ProgressBar(2);
    }

    // Initial full render
    render(model) {
        // const steper= new ProgressBar(2).render();
        const html = `
            <div class="my-5">
                <div id="mobileBackCheckout" class="mb-4 d-block d-md-none">
                    <a href="#" class="text-dark">← back</a>
                </div>
                <!-- Replace the hardcoded stepper with ProgressBar -->
                <div id="checkoutProgressBar" class="mb-4">
                    ${this.progressBar.render()}
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
                            <h4 id="shippingAddressTitleCheckout" class="section-title fw-bold mb-3">SHIPPING ADDRESS</h4>
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
                            <h4 id="paymentMethodTitleCheckout" class="section-title fw-bold mb-3">PAYMENT METHOD</h4>
                            <div id="formCheckCodCheckout" class="form-check mb-3">
                                <input id="codInputCheckout" class="form-check-input" type="radio" name="paymentMethod" id="cod" checked disabled>
                                <label id="codLabelCheckout" class="form-check-label" for="cod">Cash on Delivery (COD)</label>
                            </div>
                        </div>
                    </div>
                    <div id="orderSummaryCheckout" class="col-md-4 mt-4 mt-md-0">
                        <div id="orderSummaryCardCheckout" class="card p-4">
                            <h4 id="orderSummaryTitleCheckout" class="section-title fw-bold mb-3">ORDER SUMMARY</h4>
                            <div id="orderItemsContainerCheckout"></div>
                            <div class="mb-3">
                                <p id="shippingOptionCheckout" class="mb-1">Shipping: ${this.formatShippingOption(model.getShippingOption())}</p>
                                <p id="shippingCostCheckout" class="mb-1">Shipping Cost: $${model.getShippingCost().toFixed(2)}</p>
                            </div>
                            <div id="couponInputCheckout" class="d-flex mb-3">
                                <input id="couponCodeCheckout" type="text" class="form-control me-2" placeholder="JENKAMW">
                                <button id="applyCouponCheckout" class="btn btn-dark">APPLY</button>
                            </div>
                            <p id="couponAppliedCheckout" class="text-success mb-3">Discount: $${model.couponDiscount.toFixed(2)} (REMOVE)</p>
                            <div id="totalSectionCheckout" class="fw-bold">
                                <div id="subtotalRowCheckout" class="d-flex justify-content-between">
                                    <span id="subtotalLabelCheckout">SUBTOTAL</span>
                                    <span id="subtotalCheckout">$${model.getSubtotal().toFixed(2)}</span>
                                </div>
                                <div id="shippingRowCheckout" class="d-flex justify-content-between">
                                    <span id="shippingLabelCheckout">SHIPPING</span>
                                    <span id="shippingCostCheckout">$${model.getShippingCost().toFixed(2)}</span>
                                </div>
                                <div id="totalRowCheckout" class="d-flex justify-content-between">
                                    <span id="totalLabelCheckout">TOTAL</span>
                                    <span id="totalCheckout">$${model.calculateDiscountedTotal().toFixed(2)}</span>
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
        this.updateOrderSummary(model);
    }

    // Update only the order summary section
    updateOrderSummary(model) {
        const html = `
            ${model.getItems().map(item => `
                <div id="orderItem${item.id}Checkout" class="d-flex align-items-center mb-3">
                    <img id="itemImage${item.id}Checkout" src="${item.url}" alt="${item.name}" class="me-3">
                    <div id="itemDetails${item.id}Checkout" class="flex-grow-1">
                        <p id="itemName${item.id}Checkout" class="mb-1">${item.name}</p>
                        <div id="quantityControls${item.id}Checkout" class="d-flex align-items-center">
                            <input id="quantityInput${item.id}Checkout" type="text" value="${item.quantity}" readonly disabled class="form-control w-25 mx-2 text-center quantity">
                        </div>
                    </div>
                    <span id="itemPrice${item.id}Checkout" class="ms-auto item-price">$${item.price.toFixed(2)}</span>
                </div>
            `).join('')}
        `;
        this.orderSummaryContainer.innerHTML = html;

        // Update dynamic totals
        // document.getElementById('subtotalCheckout').textContent = `$${model.subtotal.toFixed(2)}`;
        // document.getElementById('shippingCostCheckout').textContent = `$${model.getShippingCost().toFixed(2)}`;
        document.getElementById('totalCheckout').textContent = `$${model.calculateDiscountedTotal().toFixed(2)}`;
        document.getElementById('couponAppliedCheckout').textContent = `Discount: $${model.couponDiscount.toFixed(2)} (REMOVE)`;
        // document.getElementById('shippingOptionCheckout').textContent = `Shipping: ${this.formatShippingOption(model.selectedShipping)}`;
    }

    // Helper method to format shipping option display
    formatShippingOption(option) {
        const options = { free: 'Free Shipping', express: 'Express Shipping', pickUp: 'Pick Up' };
        return options[option] || 'Unknown Shipping';
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