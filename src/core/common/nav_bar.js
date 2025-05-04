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

                <i class="fa-solid fa-bag-shopping m-2 clickMouse" style="font-size: 2rem;"></i>
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
                        <button class="btn-search"><i class="fas fa-search"></i></button>
                        <input type="text" class="input-search" placeholder="Type to Search...">
                    </div>
                </form>
                <i class="fa-solid fa-user avatar-outline m-2 cursor-pointer hover-effect clickMouse "></i>
            </div>
        </div>
    </nav>
    
    <!--Cart Drawer -->
<div id="cart-drawer" class="cart-drawer">
    <div class="cart-header">
        <h5>Cart</h5>
        <button id="close-cart" class="btn btn-sm btn-outline-secondary">&times;</button>
    </div>
    <div id="drawer-cart-items" class="p-2">
        <!-- Items will be injected here -->
    </div>
    <div class="cart-footer p-3">
        <p>Subtotal: $<span id="drawer-subtotal"></span></p>
        <strong>Total: $<span id="drawer-total"></span></strong>
        <button id="go-to-checkout" class="btn btn-dark w-100 mt-2">Checkout</button>
    </div>
</div>`;
    }

    render() {
        document.getElementById("navbar").innerHTML = this.htmlcontent;
    }

}