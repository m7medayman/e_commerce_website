import { FooterWidget } from '../../../core/common/footer.js';
import { NavBar } from '../../../core/common/nav_bar.js';
import { CarouselComponent } from './components/corsaul.js';
import { ProductComponent } from './components/product.js';
export class HomeView {
    renderPage() {
        new FooterWidget().render();
        new NavBar().render();

    }
    renderCarousel(images) {
        document.getElementById("mycorsaul").innerHTML = new CarouselComponent(images).render();
    }
    renderNewProducts(punchOfProducts) {
        const productsSliders = this.builedProductsSlider(punchOfProducts);
        const newProductsContainer = document.getElementById("new-products");
        newProductsContainer.innerHTML = productsSliders;

    }

    builedProductsSlider(punchOfProducts) {
        const mainContainer = document.createElement("div");
        mainContainer.className = "row flex-nowrap overflow-auto gx-3";
        mainContainer.innerHTML = "";
        punchOfProducts.forEach((product) => {
            const productComponent = new ProductComponent(product);
            mainContainer.innerHTML += productComponent.render();
        });
        const wrapper = document.createElement("div");
        wrapper.className = "overflow-hidden";
        wrapper.appendChild(mainContainer);
        return wrapper.getHTML();

    }
}