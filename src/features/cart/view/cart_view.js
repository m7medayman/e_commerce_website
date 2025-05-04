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
  renderDrawerCart(cartModel) {
     const items = cartModel.getCartItems();
    const container = document.getElementById("drawer-cart-items");
    container.innerHTML = items.map((item, index)=> `
        <div class="d-flex justify-content-between align-items-center border-bottom py-2">
            <img src="${item.url}" width="80" height="80" class="rounded">
            <div>
                <p class="mb-0">${item.name}</p>
                <div class="d-flex gap-3 align-items-center border rounded p-1 mt-2">
               <span class="change hover-pointer" data-action="decrease" data-index="${index}">−</span>
              <span>${item.quantity}</span>
              <span class="change hover-pointer" data-action="increase" data-index="${index}">+</span>
         </div>
            </div>
            <div>
            <p>$${item.price.toFixed(2)}</p>
             <div class="removed text-center" data-action="remove" data-index="${index} ">
              ✖ 
            </div>
            </div>
        </div>
    `).join("");


    document.getElementById("drawer-subtotal").innerText = cartModel.getSubtotal().toFixed(2);
    document.getElementById("drawer-total").innerText = cartModel.getTotal().toFixed(2);

}
  renderCart(cartItems) {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';

    cartItems.forEach((product, index) => {
      const item = new CartItem(product, index);
      container.innerHTML += item.render();
    });

  }

  renderSummary(subtotal, selectedShipping) {
    document.getElementById('cart-summary').innerHTML = new CartSummary(subtotal, selectedShipping).render();
  }
  // renderCoupon() {
  //   document.getElementById('coupon-code').innerHTML = new CouponCode().render();
  // }


}