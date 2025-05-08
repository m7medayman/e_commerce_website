import { ProductModel } from "../models/product_model.js";
export class NavBar {
    constructor() {
        this.htmlcontent = `
    <nav class="navbar navbar-expand-lg " style="background-color: #fff;">
        <div class="container-fluid align-items-center">
            <!-- Hamburger button for mobile -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
                aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Brand/name -->
            <a class="navbar-brand" href="#">3legant</a>

            <!-- THIS DIV: flex container for trailing icons; put it after brand for mobile alignment -->
            <div class="d-flex align-items-center ms-auto order-lg-3">

                <a href="/public/cart.html" style="text-decoration: none; color: inherit;">
                <i class="fa-solid fa-bag-shopping m-2 clickMouse" style="font-size: 2rem;"></i>
                </a>
            </div>

            <!-- This is the collapsible nav and search (order-lg-2 so navbar nav stays “center” on desktop) -->
            <div class="collapse navbar-collapse order-lg-2" id="navbarTogglerDemo03">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">shop</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">product</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">contact us</a>
                    </li>



                </ul>
               <form class="d-flex middle" role="search">
                    <div class="search-box">
                        <button class="btn-search" type="button"><i class="fas fa-search"></i></button>
                        <input type="text" class="input-search" placeholder="Type to Search...">
                          <div class="search-results-dropdown">
            <!-- Search results will be added here dynamically -->
        </div>
                    </div>
                    
                </form>
                <i class="fa-solid fa-user avatar-outline m-2 cursor-pointer hover-effect clickMouse "></i>
            </div>
        </div>
    </nav>`;
    }

    render() {
        document.getElementById("navbar").innerHTML = this.htmlcontent;
        this.renderSearchResult();
    }
    renderSearchResult() {
        document.addEventListener('DOMContentLoaded', function () {
            const searchInput = document.querySelector('.input-search');
            const searchResultsDropdown = document.querySelector('.search-results-dropdown');

            // For demonstration - replace with your API call
            const fetchSearchResults = (searchTerm) => {

                const allItems = ProductModel.getAll();
                const filteredItems = allItems.filter(item =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                return filteredItems;
            };

            // Debounce function to prevent excessive API calls
            const debounce = (func, delay) => {
                let debounceTimer;
                return function () {
                    const context = this;
                    const args = arguments;
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => func.apply(context, args), delay);
                };
            };

            // Update search results
            const updateSearchResults = (searchTerm) => {
                if (searchTerm.length === 0) {
                    searchResultsDropdown.style.display = 'none';
                    return;
                }

                try {
                    // Get search results
                    const results = fetchSearchResults(searchTerm);

                    // Clear previous results
                    searchResultsDropdown.innerHTML = '';

                    // Display products with image, name, and price
                    results.forEach((product) => {
                        const resultItem = document.createElement('div');
                        resultItem.classList.add('search-item');

                        // Create product card layout
                        resultItem.innerHTML = `
                            <div class="search-product">
                                <div class="search-product-image">
                                    <img src="${product.detailedImages[0]}" alt="${product.name}">
                                </div>
                                <div class="search-product-info">
                                    <div class="search-product-name">${product.name}</div>
                                    <div class="search-product-price">price: ${product.price} $</div>
                                </div>
                            </div>
                        `;

                        // Handle product selection
                        resultItem.addEventListener('click', function () {
                            // Navigate to product page or perform other actions
                            window.location.href = `./product_details.html?id=${product.productId}`;                            // Alternative: just fill the search box
                            // searchInput.value = product.name;
                            searchResultsDropdown.style.display = 'none';
                        });

                        searchResultsDropdown.appendChild(resultItem);
                    });

                    // Show dropdown if we have results
                    if (results.length > 0) {
                        searchResultsDropdown.style.display = 'block';
                    } else {
                        searchResultsDropdown.style.display = 'none';
                    }
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            };

            // Apply debouncing to avoid excessive searches while typing
            const debouncedSearch = debounce((searchTerm) => {
                updateSearchResults(searchTerm);
            }, 300); // 300ms delay

            // Attach input event listener
            searchInput.addEventListener('input', function () {
                const searchTerm = this.value;
                debouncedSearch(searchTerm);
            });

            // Hide dropdown when clicking outside
            document.addEventListener('click', function (event) {
                if (!searchInput.contains(event.target) && !searchResultsDropdown.contains(event.target)) {
                    searchResultsDropdown.style.display = 'none';
                }
            });

            // Handle keyboard navigation
            searchInput.addEventListener('keydown', function (e) {
                if (searchResultsDropdown.style.display === 'block') {
                    const items = searchResultsDropdown.querySelectorAll('.search-item');
                    const activeItem = searchResultsDropdown.querySelector('.search-item.active');
                    let index = -1;

                    if (activeItem) {
                        index = Array.from(items).indexOf(activeItem);
                    }

                    // Down arrow
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        if (activeItem) activeItem.classList.remove('active');
                        index = (index + 1) % items.length;
                        items[index].classList.add('active');
                    }
                    // Up arrow
                    else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        if (activeItem) activeItem.classList.remove('active');
                        index = (index - 1 + items.length) % items.length;
                        items[index].classList.add('active');
                    }
                    // Enter key
                    else if (e.key === 'Enter' && activeItem) {
                        e.preventDefault();
                        searchInput.value = activeItem.textContent;
                        searchResultsDropdown.style.display = 'none';
                    }
                }
            });
        });
    }
}