import { FooterWidget } from '../../../core/common/footer.js';
import { NavBar } from '../../../core/common/nav_bar.js';
import { ProgressBar } from './components/progress_bar.js';
import { CartItem } from './components/cart-items.js';
import { CartSummary } from './components/cart-summary.js';
// import { CouponCode } from './components/coupon_code.js';
export class CartView {
  renderPage() {
    new FooterWidget().render();
    new NavBar().render();

  }
  renderProgress(step = 1) {
    document.getElementById('progress_bar').innerHTML = new ProgressBar(step).render();
  }

  renderCart(cartItems) {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
      (cartItems.length>0)?
    cartItems.forEach((product, index) => {
      const item = new CartItem(product, index);
      container.innerHTML += item.render();
    }):container.innerHTML=`<p class='text-center'>No Products added to cart</p>`;

  }

  renderSummary(subtotal, selectedShipping) {
    document.getElementById('cart-summary').innerHTML = new CartSummary(subtotal, selectedShipping).render();
  }
  updateCheckOutButtonState(products) {
    const submitBtn = document.getElementById('checkBtn');
    submitBtn.disabled = products.length === 0;
    submitBtn.classList.add('btn-dark');
  }
  // renderCoupon() {
  //   document.getElementById('coupon-code').innerHTML = new CouponCode().render();
  // }


}