export class BigTwoPartBanner {
    constructor(img) {
        this.img = img;
    }
    render() {
        const innerHTML = `<div class="promo-banner">
            <div class="promo-image" style="background-image: url('${this.img}');"></div>
            <div class="promo-content">
                <div class="promo-label">SALE UP TO 35% OFF</div>
                <h2 class="promo-title">HUNDREDS of<br>New lower prices!</h2>
                <p class="promo-description">It's more affordable than ever to give every room in your home a stylish
                    makeover</p>
                <a href="#" class="promo-link">Shop Now <i class="fas fa-arrow-right"
                        style="font-size: 0.8rem; margin-left: 4px;"></i></a>
            </div>
        </div>`
        return innerHTML;
    }
}