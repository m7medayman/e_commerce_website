import OrderCompleteModel from '../model/confirmation_model.js';
import OrderCompleteView from '../view/confirmation_view.js';

class OrderCompleteController {
    constructor() {
        this.model = new OrderCompleteModel();
        this.view = new OrderCompleteView();
        this.view.render(this.model);

        this.setupEventListeners();
    }

    setupEventListeners() {
        // document.getElementById('purchaseHistoryBtn').addEventListener('click', (e) => {
        //     e.preventDefault();
        //     window.location.href = 'purchase-history.html';
        // });

        document.getElementById('homeLink').addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = 'home.html';
      });
    }
}

new OrderCompleteController();