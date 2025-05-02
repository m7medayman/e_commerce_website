class OrderCompleteView {
  constructor() {
      this.container = document.querySelector('.container');
      this.styles = document.createElement('link');
      this.styles.rel = 'stylesheet';
      this.styles.href = '../styles/pages/order_confirmation.css';
      document.head.appendChild(this.styles);
  }

  render(model) {
      const order = model.getOrder();
      const html = `
          <div class="my-5">
              <div class="mb-4 d-block d-md-none">
                  <a href="#" id="homeLink" class="text-dark">← Home</a>
              </div>
              <div class="d-flex justify-content-center mb-4">
                  <div class="d-flex align-items-center mx-2">
                      <div class="step-number rounded-circle text-white d-flex justify-content-center align-items-center me-2 completed">1</div>
                      <span>Shopping cart</span>
                  </div>
                  <div class="d-flex align-items-center mx-2">
                      <div class="step-number rounded-circle text-white d-flex justify-content-center align-items-center me-2 completed">2</div>
                      <span>Checkout details</span>
                  </div>
                  <div class="d-flex align-items-center mx-2">
                      <div class="step-number rounded-circle text-white d-flex justify-content-center align-items-center me-2 active">3</div>
                      <span>Order complete</span>
                  </div>
              </div>
              <div class="row justify-content-center">
                  <div class="col-12 col-md-6">
                      <div class="card p-4 text-center">
                          <h2 class="mb-3">Thank you! 🎉</h2>
                          <h4 class="mb-4">Your order has been received</h4>
                          <div class="d-flex justify-content-center mb-4">
                              ${order.items.map(item => `<img src="${item.img}" alt="${item.name}" class="mx-2">`).join('')}
                          </div>
                          <div class="text-start">
                              <div class="d-flex justify-content-between mb-2">
                                  <span>Order code:</span>
                                  <span>${order.orderCode}</span>
                              </div>
                              <div class="d-flex justify-content-between mb-2">
                                  <span>Date:</span>
                                  <span>${order.date}</span>
                              </div>
                              <div class="d-flex justify-content-between mb-2">
                                  <span>Total:</span>
                                  <span>$${order.total.toFixed(2)}</span>
                              </div>
                              <div class="d-flex justify-content-between mb-4">
                                  <span>Payment method:</span>
                                  <span>${order.paymentMethod}</span>
                              </div>
                          </div>
                          <a href="#" id="purchaseHistoryBtn" class="btn btn-dark w-100">PURCHASE HISTORY</a>
                      </div>
                  </div>
              </div>
          </div>
      `;
      this.container.innerHTML = html;
  }
}

export default OrderCompleteView;