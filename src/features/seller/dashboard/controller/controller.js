import { ProductsController } from "../../products/controller/products_controller.js";
import { OrdersController } from "../../orders/controller/orders_controller.js";
import { AuthModel } from "../../../../core/models/auth_model.js";
import { DashboardModel } from "../model/model.js";
import { DashboardView } from "../view/view.js"
class DashboardController {

  constructor(model, view) {
    const user = AuthModel.getUser();
    if (!user) {
      console.warn("No user logged in, redirecting to login.");
      window.location.href = '../login.html';
      return;
    }
    this.model = model;
    this.view = view;
    this.productsController = null;
    this.ordersController = null;
    this.init();

  }

  init() {
    this.setupEventListeners();
    this.showSection('dashboard');
  }

  setupEventListeners() {
    document.querySelectorAll('.sidebar a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        this.showSection(section);
      });
    });
    const logoutLink = document.querySelector('[data-section="logout"]');
    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        logoutLink.classList.add('text-light');
        localStorage.removeItem(AuthModel.STORAGE_KEY);
        window.location.href = '../login.html';
      });
    }
  }

  showSection(section) {
    if (section === 'dashboard') {
      const data = {
        stats: this.model.getStats(),
        products: this.model.getProducts(),
        chartData: this.model.getChartData()
      };
      this.view.renderSection(section, data);
    } else if (section === 'products') {
      document.getElementById('app').innerHTML = '<div id="container"></div>';
      if (!this.productsController) {
        this.productsController = new ProductsController();
      }
      this.productsController.init();
    } else if (section === 'orders') {
      document.getElementById('app').innerHTML = '<div id="container"></div>';
      if (!this.ordersController) {
        this.ordersController = new OrdersController();
      }
      this.ordersController.init();
    } else if (section === 'profile') {
      const sellerId = localStorage.getItem(AuthModel.STORAGE_KEY);
      const profileData = this.model.getProfile(sellerId);
      this.view.renderSection('profile', profileData);
    }

    this.view.setActiveLink(section);
  }
}

// Initialize MVC
const model = new DashboardModel();
const view = new DashboardView();
const controller = new DashboardController(model, view);
