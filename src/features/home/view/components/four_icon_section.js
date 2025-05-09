export class FourIconsSection {
    render() {
        const innerHtml = `
        <div class="row g-4">
            <!-- Free Shipping -->
            <div class="col-md-3 col-sm-6 ">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-truck"></i>
                    </div>
                    <h6 class="feature-title">Free Shipping</h6>
                    <p class="feature-text">Order above $200</p>
                </div>
            </div>

            <!-- Money-back -->
            <div class="col-md-3 col-sm-6">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-wallet"></i>
                    </div>
                    <h6 class="feature-title">Money-back</h6>
                    <p class="feature-text">30 days guarantee</p>
                </div>
            </div>

            <!-- Secure Payments -->
            <div class="col-md-3 col-sm-6">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-lock"></i>
                    </div>
                    <h6 class="feature-title">Secure Payments</h6>
                    <p class="feature-text">Secured by Stripe</p>
                </div>
            </div>

            <!-- 24/7 Support -->
            <div class="col-md-3 col-sm-6">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-phone-alt"></i>
                    </div>
                    <h6 class="feature-title">24/7 Support</h6>
                    <p class="feature-text">Phone and Email support</p>
                </div>
            </div>
        </div>`
        return innerHtml;
    }
}