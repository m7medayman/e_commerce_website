export class ProductComponent {
    constructor({
        imageUrl, altText = '', isNew = false,
        discountPct = null, isFavorite = false,
        title = '', price = '', originalPrice = null,
        rating = 0  // rating from 0 to 5
    }) {
        this.imageUrl = imageUrl;
        this.altText = altText;
        this.isNew = isNew;
        this.discountPct = discountPct;
        this.isFavorite = isFavorite;
        this.title = title;
        this.price = price;
        this.originalPrice = originalPrice;
        this.rating = rating;
    }
    render() {
        // Build the 5-star HTML
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= this.rating) {
                // filled star
                starsHtml += `<i class="fas fa-star text-warning"></i>`;
            } else {
                // bordered (unfilled) star
                starsHtml += `<i class="fa-regular fa-star"></i>`;
            }
        }

        // wrap in your col/card markup
        const wrapper = document.createElement('div');
        wrapper.className = 'col-6 col-sm-4 col-md-3 d-flex';

        const card = document.createElement('div');
        card.className = 'product-card shadow-sm w-100';
        card.innerHTML = `
<div class="position-relative">
  ${this.isNew ? `<span class="badge-new">NEW</span>` : ''}
  ${this.discountPct ? `<span class="badge-discount">-${this.discountPct}%</span>` : ''}
  <button class="wishlist-btn">
    <i class="${this.isFavorite ? 'fas' : 'far'} fa-heart"></i>
  </button>
  <img src="${this.imageUrl}"
       alt="${this.altText}"
       class="product-img"
       style="height:70%;" />
</div>
<div class="p-3">
  <button class="btn-outline-primary">Add to cart</button>
  <div class="mb-2 mt-2">
    ${starsHtml}
  </div>
  <h5 class="mb-1">${this.title}</h5>
  <div>
    <span class="fw-bold">${this.price}</span>
    ${this.originalPrice
                ? `<span class="original-price">${this.originalPrice}</span>`
                : ''
            }
  </div>
</div>
`;

        wrapper.appendChild(card);
        return wrapper.getHTML();
    }

}