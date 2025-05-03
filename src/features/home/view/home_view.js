import { FooterWidget } from '../../../core/common/footer.js';
import { NavBar } from '../../../core/common/nav_bar.js';
import { CarouselComponent } from './components/corsaul.js';
import { ProductComponent } from './components/product.js';
import { ThreeImageSection } from './components/three_img_section.js';
import {FourIconsSection} from "./components/four_icon_section.js";
import{BigTwoPartBanner} from "./components/big_two_part_banner.js";
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
    renderThreeImageSection(item1, item2, item3) {
        const threeImageSection = new ThreeImageSection(item1, item2, item3).render();
        const threeImageContainer = document.getElementById("three-image-section");
        threeImageContainer.innerHTML = threeImageSection;
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
    renderFourIconsSection() {
        const fourIconsSection = new FourIconsSection().render();
        const fourIconsContainer = document.getElementById("four-icons-section");
        fourIconsContainer.innerHTML = fourIconsSection;
    }
    renderBigTwoPartBanner(img) {
        const bigTwoPartBanner = new BigTwoPartBanner(img).render();
        const bigTwoPartContainer = document.getElementById("big-two-part-banner");
        bigTwoPartContainer.innerHTML = bigTwoPartBanner;
    }
}