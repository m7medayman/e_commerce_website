import { HomeModel } from '../model/home_model.js';
import { HomeView } from '../view/home_view.js';
export class HomeController {
    constructor() {
        this.model = new HomeModel();
        this.view = new HomeView();

    }

    init() {
        let images = this.model.getImages();
        let products = this.model.getProducts();
        let threeImageSection = this.model.getThreeImageSection();
        this.view.renderPage();
        this.view.renderCarousel(images);
        this.view.renderNewProducts(products);
        this.view.renderThreeImageSection(threeImageSection[0], threeImageSection[1], threeImageSection[2]);

    }

    setupEventListeners() {
        // Add any event listeners here if needed
    }
}