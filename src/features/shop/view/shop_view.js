import { FooterWidget } from "../../../core/common/footer.js";
import { NavBar } from '../../../core/common/nav_bar.js';
import { Toast } from '../../../core/common/toast.js';
import { ProductComponent } from '../../../core/common/product.js';


export class ShopView {
    renderPage() {
        new FooterWidget().render();
        new NavBar().render();
        this.toast = new Toast();
        this.toast.render();

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
                    addToCartFunction(productId);
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

                    // Update icon classes based on new state
                    if (newIsFavorite) {
                        icon.classList.remove("far");
                        icon.classList.add("fas");
                    } else {
                        icon.classList.remove("fas");
                        icon.classList.add("far");
                    }

                    // Call the callback function
                    if (addTofavoriteFuction) {
                        addTofavoriteFuction(productId, newIsFavorite);
                    }

                    console.log("Wishlist toggled for product ID:", productId, "New state:", newIsFavorite);

                    // Prevent card click event from firing other handlers
                    e.stopPropagation();
                }

            });
        });
    }
    renderNewProducts(punchOfProducts) {
        const productsSliders = this.builedProductsSlider(punchOfProducts);
        const newProductsContainer = document.getElementById("products");
        newProductsContainer.appendChild(productsSliders);

    }
    builedProductsSlider(punchOfProducts) {
        const mainContainer = document.createElement("div");
        mainContainer.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4";
        mainContainer.innerHTML = "";
        punchOfProducts.forEach((product) => {
            const productComponent = new ProductComponent(product);
            mainContainer.appendChild(productComponent.render());
        });
        const wrapper = document.createElement("div");
        wrapper.appendChild(mainContainer);
        return wrapper;

    }
}