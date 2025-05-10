export class FooterWidget {
    render() {
        let footerHtml = `
        <footer class="footer" id="footerId">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <div class="logo">3legant.</div>
                    <div class="description">Gift & Decoration Store</div>
                </div>
                <div class="col-md-6 text-md-end mt-4 mt-md-0">
                    <div class="nav-links">
                        <a href="home.html">Home</a>
                        <a href="shop.html">Shop</a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom mt-4">
                <div class="mb-2 mb-md-0">
                    Copyright © 2023 3legant. All rights reserved
                </div>
                <div class="links mb-2 mb-md-0">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Use</a>
                </div>
                <div class="social-icons">
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-youtube"></i></a>
                </div>
            </div>
        </div>
    </footer>`;
        document.getElementById("footer").innerHTML = footerHtml;


    }

}