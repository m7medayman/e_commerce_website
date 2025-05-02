import { FooterWidget } from '../../../core/common/footer.js';
import { NavBar } from '../../../core/common/nav_bar.js';
import { ProgressBar } from './components/progress_bar.js';
import { CartItem } from './components/cart-items.js';
export class CartView {
    renderPage() {
        new FooterWidget().render();
        new NavBar().render();

    }
    renderProgress(){
        document.getElementById('progress_bar').innerHTML=new ProgressBar(1).render();
    }

    renderCart(cartItems) {
        const container = document.getElementById('cart-items');
        container.innerHTML = '';
      
        cartItems.forEach((product, index) => {
          const item = new CartItem(product, index);
          container.innerHTML += item.render();
        });
      
      }



}