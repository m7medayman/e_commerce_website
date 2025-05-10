import { FooterWidget } from '../../../core/common/footer.js';
import { NavBar } from '../../../core/common/nav_bar.js';
import { CarouselComponent } from './components/corsaul.js';
import { ProductComponent } from '../../../core/common/product.js';
import { ThreeImageSection } from './components/three_img_section.js';
import { FourIconsSection } from "./components/four_icon_section.js";
import { BigTwoPartBanner } from "./components/big_two_part_banner.js";
import { Toast } from '../../../core/common/toast.js';
export class HomeView {
    renderPage() {
        new FooterWidget().render();
        new NavBar("home").render();
        this.toast = new Toast();
        this.toast.render();

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
                this.toast.showToast("Product added to cart", "Success");
                // Handle the add-to-cart logic here
                // You can call your cart controller function here, e.g.:
                // addToCart(productId);

            });
        });
    }
    addEventListenerToProductCard(addToCartFunction, addTofavoriteFuction, goToProductPageFunction) {
        const productCards = document.querySelectorAll(`.${ProductComponent.targetClassName}`);

        productCards.forEach((card) => {
            const productId = card.getAttribute(ProductComponent.dataProductId);
            const isFavorite = card.getAttribute(ProductComponent.dataIsFavorite);
            card.addEventListener("click", (e) => {
                const actionElement = e.target.closest('[data-action]');
                if (actionElement === null) {
                    goToProductPageFunction(productId);
                    console.log("go to product page");
                    return;
                }
                const action = actionElement.dataset.action;


                console.log(action);
                if (action === ProductComponent.addtoCartAction) {
                    if (!addToCartFunction(productId)) {
                        return;
                    }
                    this.toast.showToast("product added to cart", "Success");
                    return;

                }
                else if (action === ProductComponent.toggelFavoriteAction) {
                    // Get the actual button that was clicked (or its closest parent with data-action)
                    const button = e.target.closest(`[data-action="${ProductComponent.toggelFavoriteAction}"]`);
                    if (!button) return;

                    // Find the icon inside the button
                    const icon = button.querySelector("i");
                    if (!icon) return;

                    // Get CURRENT favorite state from the card attribute
                    const isFavorite = card.getAttribute(ProductComponent.dataIsFavorite) === "true";

                    // Toggle the favorite state
                    const newIsFavorite = !isFavorite;

                    // Update the card attribute with the new state
                    card.setAttribute(ProductComponent.dataIsFavorite, newIsFavorite);

                    // Call the callback function
                    if (addTofavoriteFuction) {
                        if (!addTofavoriteFuction(productId, newIsFavorite)) {
                            return;
                        };
                    }
                    // Update icon classes based on new state
                    if (newIsFavorite) {
                        icon.classList.remove("far");
                        icon.classList.add("fas");
                    } else {
                        icon.classList.remove("fas");
                        icon.classList.add("far");
                    }


                    console.log("Wishlist toggled for product ID:", productId, "New state:", newIsFavorite);

                    // Prevent card click event from firing other handlers
                    e.stopPropagation();
                }

            });
        });
    }
    // addWishlistEventListener() {
    //     const wishlistButtons = document.querySelectorAll(`.${ProductComponent.wishlistBtnClassName}`);
    //     wishlistButtons.forEach((button) => {
    //         button.addEventListener("click", (event) => {
    //             const productCard = button.closest(`.${ProductComponent.targetClassName}`);
    //             if (!productCard) return;

    //             const productId = productCard.getAttribute(ProductComponent.dataProductId);
    //             const isFavorite = productCard.getAttribute(ProductComponent.dataIsFavorite);

    //             // Always target the <i> icon inside the button
    //             const icon = button.querySelector("i");
    //             if (!icon) return;

    //             const newIsFavorite = isFavorite !== "true";
    //             productCard.setAttribute(ProductComponent.dataIsFavorite, newIsFavorite);

    //             icon.classList.toggle("fas", newIsFavorite);
    //             icon.classList.toggle("far", !newIsFavorite);

    //             console.log("Wishlist toggled for product ID:", productId);
    //             // Optional: call your controller here
    //             // toggleWishlist(productId, newIsFavorite);
    //         });
    //     })

    // }
    // addAddToCartEventListener(controllerAddToCartFunction) {
    //     // 1. Get all product cards
    //     const productCards = document.querySelectorAll(`.${ProductComponent.targetClassName}`);

    //     // 2. Add click event to each product card
    //     productCards.forEach((card) => {
    //         card.addEventListener("click", (event) => {
    //             // 3. Check if the clicked element or its ancestors are buttons that should be excluded
    //             const isExcludedButton = event.target.closest(`.${ProductComponent.addBtnClassName}`) ||
    //                 event.target.closest('.some-other-btn-class') ||
    //                 event.target.tagName === 'BUTTON' ||
    //                 event.target.tagName === 'A';

    //             // 4. If it's a button or link, don't execute the add to cart function
    //             if (isExcludedButton) {
    //                 return;
    //             }

    //             // 5. Get the product ID from the data attribute
    //             const productId = card.getAttribute(`${ProductComponent.dataProductId}`);
    //             if (!productId) return;

    //             // 6. Call the controller function and show toast
    //             controllerAddToCartFunction(productId);
    //             this.toast.showToast("Product added to cart", "Success");
    //         });
    //     });

    //     // 7. Keep separate event handlers for buttons if needed
    //     const someOtherButtons = document.querySelectorAll('.some-other-btn-class');
    //     someOtherButtons.forEach(button => {
    //         button.addEventListener("click", (event) => {
    //             event.stopPropagation(); // Prevent the card click event from firing
    //             // Your other button logic here
    //         });
    //     });
    // }
}