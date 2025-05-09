import { FooterWidget } from "../../../core/common/footer.js";
import { NavBar } from '../../../core/common/nav_bar.js';
import { Toast } from '../../../core/common/toast.js';
import { ProductComponent } from '../../../core/common/product.js';


export class ShopView {
    renderPage(categories) {
        new FooterWidget().render();
        new NavBar().render();
        this.toast = new Toast();
        this.toast.render();
        this.renderFilterSection(categories);

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

        // Clear previous products
        newProductsContainer.innerHTML = '';

        // Add products
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
    renderFilterSection(categories) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'container mb-4 mt-4';
        filterContainer.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h2>Our Products</h2>
                </div>
                <div class="col-md-6 d-flex justify-content-end">
                    <!-- Category Dropdown -->
                    <div class="dropdown me-2">
                        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="categoryDropdown" 
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Category
                        </button>
                        <ul class="dropdown-menu" id="categoryMenu" aria-labelledby="categoryDropdown">
                            <li><a class="dropdown-item active" href="#" data-category="all">All Categories</a></li>
                            ${categories.map(category =>
            `<li><a class="dropdown-item" href="#" data-category="${category}">${category}</a></li>`
        ).join('')}
                        </ul>
                    </div>
                    
                    <!-- Price Range Dropdown -->
                    <div class="dropdown">
                        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="priceDropdown" 
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Price Range
                        </button>
                        <ul class="dropdown-menu" id="priceMenu" aria-labelledby="priceDropdown">
                            <li><a class="dropdown-item active" href="#" data-price="all">All Prices</a></li>
                            <li><a class="dropdown-item" href="#" data-price="under50">Under $50</a></li>
                            <li><a class="dropdown-item" href="#" data-price="50to100">$50 - $100</a></li>
                            <li><a class="dropdown-item" href="#" data-price="100to200">$100 - $200</a></li>
                            <li><a class="dropdown-item" href="#" data-price="over200">Over $200</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Insert filter section before products container
        const productsContainer = document.getElementById('products');
        productsContainer.parentNode.insertBefore(filterContainer, productsContainer);
    }
    addFilterEventListeners(filterCallback) {
        // Category filter
        document.querySelectorAll('#categoryMenu .dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                // Update active state
                document.querySelectorAll('#categoryMenu .dropdown-item').forEach(i =>
                    i.classList.remove('active'));
                e.target.classList.add('active');

                // Update dropdown button text
                const category = e.target.dataset.category;
                document.getElementById('categoryDropdown').textContent =
                    category === 'all' ? 'Category' : e.target.textContent;

                // Call the callback
                filterCallback('category', category);
            });
        });

        // Price range filter
        document.querySelectorAll('#priceMenu .dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                // Update active state
                document.querySelectorAll('#priceMenu .dropdown-item').forEach(i =>
                    i.classList.remove('active'));
                e.target.classList.add('active');

                // Update dropdown button text
                const priceRange = e.target.dataset.price;
                document.getElementById('priceDropdown').textContent =
                    priceRange === 'all' ? 'Price Range' : e.target.textContent;

                // Call the callback
                filterCallback('priceRange', priceRange);
            });
        });
    }

}