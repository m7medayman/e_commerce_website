import { FooterWidget } from '../../../core/common/footer.js';
import { NavBar } from '../../../core/common/nav_bar.js';
import { CarouselComponent } from './components/corsaul.js';
import { ProductComponent } from './components/product.js';
import { ThreeImageSection } from './components/three_img_section.js';
import { FourIconsSection } from "./components/four_icon_section.js";
import { BigTwoPartBanner } from "./components/big_two_part_banner.js";
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
        newProductsContainer.appendChild(productsSliders);

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
            mainContainer.appendChild(productComponent.render());
        });
        const wrapper = document.createElement("div");
        wrapper.className = "overflow-hidden";
        wrapper.appendChild(mainContainer);
        return wrapper;

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
    addAddToCartEventListener(controllerAddToCartFunction) {


        const addToCartButtons = document.querySelectorAll(`.${ProductComponent.addBtnClassName}`);

        addToCartButtons.forEach((button) => {
            button.addEventListener("click", (event) => {

                const productCard = event.target.closest(`.${ProductComponent.targetClassName}`);
                if (!productCard) return;

                // Get the product ID from the data attribute
                const productId = productCard.getAttribute(`${ProductComponent.dataProductId}`);
                if (!productId) return;
                controllerAddToCartFunction(productId);
                // Handle the add-to-cart logic here
                // You can call your cart controller function here, e.g.:
                // addToCart(productId);

            });
        });

    }
    addWishlistEventListener() {
        const wishlistButtons = document.querySelectorAll(`.${ProductComponent.wishlistBtnClassName}`);
        wishlistButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
            const productCard = button.closest(`.${ProductComponent.targetClassName}`);
            if (!productCard) return;
        
            const productId = productCard.getAttribute(ProductComponent.dataProductId);
            const isFavorite = productCard.getAttribute(ProductComponent.dataIsFavorite);
        
            // Always target the <i> icon inside the button
            const icon = button.querySelector("i");
            if (!icon) return;
        
            const newIsFavorite = isFavorite !== "true";
            productCard.setAttribute(ProductComponent.dataIsFavorite, newIsFavorite);
        
            icon.classList.toggle("fas", newIsFavorite);
            icon.classList.toggle("far", !newIsFavorite);
        
            console.log("Wishlist toggled for product ID:", productId);
            // Optional: call your controller here
            // toggleWishlist(productId, newIsFavorite);
          });
        })
        
    }}