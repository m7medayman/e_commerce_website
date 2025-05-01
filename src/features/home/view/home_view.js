import { FooterWidget } from '../../../core/common/footer.js';
import { NavBar } from '../../../core/common/nav_bar.js';
import { CarouselComponent } from './components/corsaul.js';
export class HomeView {
    renderPage() {
        let footer = new FooterWidget();
        let nav = new NavBar("product");
        document.getElementById("navbar").innerHTML = nav.render();
        document.getElementById("footer").innerHTML = footer.render();


    }
    renderCarousel(images) {
        document.getElementById("mycorsaul").innerHTML = new CarouselComponent(images).render();
    }
    renderProducts(products) {
        let productHtml = products.map(product => `
            <div class="col-md-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title`
        );
        document.getElementById("products").innerHTML = productHtml.join('');

    }
    addToCart(productId) {
        // Logic to add the product to the cart

    }
}