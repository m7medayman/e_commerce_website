import { FooterWidget } from "../../../core/common/footer.js";
import { NavBar } from "../../../core/common/nav_bar.js";
import { Toast } from "../../../core/common/toast.js";
export class ProductView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }
  renderPage() {
    new FooterWidget().render();
    new NavBar().render();
    this.toast = new Toast();
    this.toast.render();

  }

  render(product) {

    if (!product) {
      this.container.innerHTML = "<p>Product not found.</p>";
      return;
    }
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= product.rate) {
        // filled star
        starsHtml += `<i class="fas fa-star text-warning"></i>`;
      } else {
        // bordered (unfilled) star
        starsHtml += `<i class="fa-regular fa-star"></i>`;
      }
    }
    this.container.innerHTML = `
        <div class="container">
        <div class="row">
            <div class="col-md-6 p-5 d-flex flex-column align-items-center">
                <div class="main-img border mb-3">
                    <img id="main-image" class="w-100" src="${product.detailedImages[0]}" alt="main image">
                </div>
                <div class="imgs-details d-none m-2 d-md-flex w-100 d-flex ">
                ${product.detailedImages.map(
      (image) => `<img class="img-thumbnail small-image" src="${image}" alt="Detailed Image">`
    ).join('')}
                </div>
            </div>
            <div class="col-md-6 p-5">
                <div class="rating mb-3">
                   ${starsHtml}
                    <span>${product.numberOfReviews} Reviews</span>
                </div>
                <div class="product-name fw-bold fs-3 mb-3">
                    ${product.name}
                </div>
                <div class="product-description mb-3">
                ${product.description}
                                </div>
                <div class="product-price mb-3">
                    <span class="fw-bold fs-3 mx-2">${(product.price) - product.price * product.discount / 100}</span> 
                    <span class="discount fs-3 ">${product.price}</span>
                </div>
                
                <div class="product-measurements mb-3">
                    <div class="fw-bold mb-2">Measurements</div>
                    <div class="measurements_value text-dark"> ${product.measurements}</div>
            </div>
            
            <div class="d-flex">
                <div class=" d-flex justify-content-between" >
                    <input type="number"  class="form-control text-center quantity"  value="1" min="1" id="count">
                </div>

                <button class="${product.isFavorite ? "btn-primary" : "btn-outline-primary"} wishBtn mb-3 details_button" id="favorite" data-favorite=${product.isFavorite}> <span><i class="far fa-heart"></i></span> Wishlist</button>
            </div>
            <button class="btn-primary details_button" id="addToCart"> Add To Cart</button>
        </div>
    </div>
      `;
    // Add event listeners to small images
    const mainImage = document.getElementById("main-image");
    const smallImages = document.querySelectorAll(".small-image");

    smallImages.forEach((img) => {
      img.addEventListener("click", () => {
        mainImage.src = img.src;
        smallImages.forEach((image) => image.classList.remove("active"));

        img.classList.add("active");

      });
    })

    mainImage.addEventListener("load", () => {
      smallImages.forEach((image) => {
        if (image.src === mainImage.src) {
          image.classList.add("active");
        } else {
          image.classList.remove("active");
        }
      });
    });




  }
  addToCartEventListner(addToCart) {
    document.getElementById("addToCart").addEventListener("click", () => {
      let count = document.getElementById("count").value;

      count = Number.parseInt(count);
      addToCart(count);
      // Add the product to cart using the id
      this.toast.showToast("Product added to cart", "Success");
    });
  }
  togelFavorite(favoriteFunc) {
    const button = document.getElementById("favorite");
    button.addEventListener("click", function (event) {
      const isFavorite = button.classList.contains('btn-primary');

      favoriteFunc(!isFavorite);
      // Toggle the class
      if (isFavorite) {
        button.classList.remove('btn-primary');
        button.classList.add('btn-outline-primary');
      } else {
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-primary');
      }
    })
  }
}

