import { HomeModel } from '../model/home_model.js';
import { HomeView } from '../view/home_view.js';
export class HomeController {
    constructor() {
        this.model = new HomeModel();
        this.view = new HomeView();
        
    }

    init() {
        let images = this.model.getImages();
        this.view.renderPage();
        this.view.renderCarousel(images);

    }

    setupEventListeners() {
        // Add any event listeners here if needed
    }
}