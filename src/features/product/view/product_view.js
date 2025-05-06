import { FooterWidget } from "../../../core/common/footer.js";
import { NavBar } from "../../../core/common/nav_bar.js";
export class ProductView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(product) {
    new FooterWidget().render();
    new NavBar().render();
    if (!product) {
      this.container.innerHTML = "<p>Product not found.</p>";
      return;
    }

    this.container.innerHTML = `
        <div class="container">
        <div class="row">
            <div class="col-md-6 p-5 d-flex flex-column align-items-center">
                <div class="main-img border mb-3">
                    <img id="main-image" class="w-100" src="${product.img}" alt="main image">
                </div>
                <div class="imgs-details d-none m-2 d-md-flex w-100 d-flex justify-content-between">
                ${product.detailedImages.map(
      (image) => `<img class="img-thumbnail small-image" src="${image}" alt="Detailed Image">`
    ).join('')}
                </div>
            </div>
            <div class="col-md-6 p-5">
                <div class="rating mb-3">
                    <i class="fas fa-star text-dark"></i>
                    <i class="fas fa-star text-dark"></i>
                    <i class="fas fa-star text-dark"></i>
                    <i class="fas fa-star text-dark"></i>
                    <i class="fas fa-star text-dark"></i>
                    <span>11 Reviews</span>
                </div>
                <div class="product-name fw-bold fs-3 mb-3">
                    ${product.name}
                </div>
                <div class="product-description mb-3">
                ${product.description}
                                </div>
                <div class="product-price mb-3">
                    <span class="fw-bold fs-3 mx-2">${product.price}</span> 
                    <span class="discount fs-3 ">${product.discount}</span>
                </div>
                
                <div class="product-measurements mb-3">
                    <div class="fw-bold mb-2">Measurements</div>
                    <div class="measurements_value text-dark"> ${product.measurements}</div>
            </div>
            
            <div class="d-flex">
                <div class=" d-flex justify-content-between" >
                    <input type="number"  class="form-control text-center quantity" value="1" min="1">
                </div>

                <button class="btn-outline-primary wishBtn mb-3"> <span><i class="far fa-heart"></i></span> Wishlist</button>
            </div>
            <button class="btn-primary"> Add To Cart</button>
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

}

