import { CartModel } from '../model/cart_model.js';
import { CartView } from '../view/cart_view.js';
export class CartController {
    constructor() {
        this.model = new CartModel();
        this.view = new CartView();
        
    }

    init() {
      
        this.view.renderPage();
       this.view.renderProgress();
       this.renderCart();
       this.addEventListeners();
      
    }
    renderCart(){
        const items=this.model.getCartItems();
        this.view.renderCart(items);
    }

    addEventListeners() {
        document.getElementById('cart-items').addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            const index = parseInt(e.target.dataset.index);

            if (action === 'increase') {
                this.model.updateQuantity(index, 1);
                this.renderCart();
            } else if (action === 'decrease') {
                this.model.updateQuantity(index, -1);
                this.renderCart();
            } else if (action === 'remove') {
                this.model.removeItem(index);
                this.renderCart();
            }
        });
    }

}