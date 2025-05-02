import { FooterWidget } from '../../../core/common/footer.js';
import { NavBar } from '../../../core/common/nav_bar.js';
import { ProgressBar } from './components/progress_bar.js';
import { CartItem } from './components/cart-items.js';
import { CartSummary } from './components/cart-summary.js';
export class CartView {
    renderPage() {
        new FooterWidget().render();
        new NavBar().render();

    }
    renderProgress(step=1){
        document.getElementById('progress_bar').innerHTML=new ProgressBar(step).render();
    }

    renderCart(cartItems) {
        const container = document.getElementById('cart-items');
        container.innerHTML = '';
      
        cartItems.forEach((product, index) => {
          const item = new CartItem(product, index);
          container.innerHTML += item.render();
        });
      
      }

      renderSummary(subtotal,selectedShipping){
        document.getElementById('cart-summary').innerHTML = new CartSummary(subtotal,selectedShipping).render();
      }



}